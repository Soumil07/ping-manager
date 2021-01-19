import { exec } from '@lib/utils';
import { Args, Command, PieceContext } from '@sapphire/framework';
import { codeBlock } from '@sapphire/utilities';
import type { Message } from 'discord.js';

export default class extends Command {

    public constructor(context: PieceContext) {
        super(context, {
            quotes: [],
            preconditions: ['OwnerOnly']
        })
    }

	public async run(message: Message, args: Args) {
		const code = await args.rest('string')
			.catch(() => { throw 'Missing required argument: code'; });
		const timeout = Number.isInteger(args.getOption('timeout')) ? Number(args.getOption('timeout')) : 0;

		const { stdout, stderr } = await exec(code, { timeout });
		const output = stdout ? `**OUTPUT**:${codeBlock('prolog', stdout)}` : '';
		const error = stderr ? `**ERROR**:${codeBlock('prolog', stderr)}` : '';
		const outText = [output, error].join('\n');

		if (outText.length < 2000) return message.channel.send(outText);
		return message.channel.send({ files: [{ attachment: Buffer.from(outText), name: 'output.txt' }] });
	}

}
