import { clean } from '@lib/utils';
import { Args, PieceContext, Command } from '@sapphire/framework';
import { Type } from '@sapphire/type';
import { codeBlock, isThenable } from '@sapphire/utilities';
import type { Message } from 'discord.js';
import { inspect } from 'util';


export default class extends Command {

    public constructor(context: PieceContext) {
        super(context, {
            aliases: ['ev'],
            quotes: [],
            preconditions: ['OwnerOnly'],
            strategyOptions: {
                flags: ['async', 'hidden', 'showHidden', 'silent', 's'],
                options: ['depth']
            }
        })
    }

	public async run(message: Message, args: Args) {
		const code = await args.restResult('string');
		if (!code.success) throw 'Missing required argument: code';

		const { result, success, type } = await this.eval(code.value, {
			async: args.getFlags('async'),
			depth: Number(args.getOption('depth')) ?? 0,
			showHidden: args.getFlags('hidden', 'showHidden')
		});
		const output = clean(success
			? codeBlock('js', result)
			: `**ERROR**: ${codeBlock('bash', result)}`);
		if (args.getFlags('silent', 's')) return null;

		const typeFooter = `**Type**: ${codeBlock('typescript', type)}`;

		if (output.length > 2000) {
			if (message.guild?.me?.permissionsIn(message.channel).has('ATTACH_FILES')) {
				return message.channel.send(`Output was too long... sent the result as a file.\n\n${typeFooter}`, {
					files: [{ attachment: Buffer.from(output), name: 'output.txt' }]
				});
			}
			console.log(output);
			return message.channel.send(`Output was too long... logged the result to console\n\n${typeFooter}`);
		}

		return message.channel.send(`${output}\n${typeFooter}`);
	}

	private async eval(code: string, flags: { async: boolean; depth: number; showHidden: boolean }) {
		if (flags.async) code = `(async () => {\n${code}\n})();`;
		let success = true;
		let result = null;
		try {
			// eslint-disable-next-line no-eval
			result = eval(code);
		} catch (error) {
			if (error && error.stack) this.context.client.logger.error(error);
			result = error;
			success = false;
		}

		const type = new Type(result).toString();
		if (isThenable(result)) result = await result;

		if (typeof result !== 'string') {
			result = inspect(result, {
				depth: flags.depth,
				showHidden: flags.showHidden
			});
		}

		return { result, success, type };
	}

}
