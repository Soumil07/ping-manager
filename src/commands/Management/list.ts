import { DbSet } from "@lib/database/DbSet";
import { Command, PieceContext } from "@sapphire/framework";
import { DurationFormatter } from "@sapphire/time-utilities";
import { codeBlock } from "@sapphire/utilities";
import type { Message } from "discord.js";

const kFormatter = new DurationFormatter();

export default class extends Command {

    public constructor(context: PieceContext) {
        super(context, {
            preconditions: ['GuildOnly']
        })
    }

    public async run(message: Message) {
        const { roles } = await DbSet.connect();
        const output = [];
        for (const roleData of await roles.find({ guildID: message.guild!.id })) {
            const role = message.guild!.roles.cache.get(roleData.id);
            output.push(`${role?.name ?? 'Deleted Role'} - ${kFormatter.format(roleData.cooldown)}`);
        }

        return message.channel.send(codeBlock('', output.join('\n')));
    }

}