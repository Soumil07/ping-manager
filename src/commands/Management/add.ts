import { DbSet } from "@lib/database/DbSet";
import { Args, Command, PermissionsPrecondition, PieceContext } from "@sapphire/framework";
import { DurationFormatter, Time } from "@sapphire/time-utilities";
import type { Message } from "discord.js";

const MIN_COOLDOWN = Time.Minute;
const MAX_COOLDOWN = Time.Month;

const kFormatter = new DurationFormatter();

export default class extends Command {

    public constructor(context: PieceContext) {
        super(context, {
            preconditions: ['GuildOnly', 'AdminOnly', new PermissionsPrecondition('MANAGE_ROLES')]
        })
    }

    public async run(message: Message, args: Args) {
        const cooldown = await args.pick('duration')
            .catch(() => { throw 'Please provide a cooldown duration.' });
        if (cooldown < MIN_COOLDOWN || cooldown > MAX_COOLDOWN) throw `The cooldown must be between ${kFormatter.format(MIN_COOLDOWN)} and ${kFormatter.format(MAX_COOLDOWN)}`;

        const role = await args.rest('role')
            .catch(() => { throw 'Please provide a role ID or mention.' });
        if (role.position > message.guild!.me!.roles.highest.position) throw `The role ${role.name} is higher than me! Please update its position.`;

        await role.setMentionable(true);
        const { roles } = await DbSet.connect();
        const roleSettings = await roles.ensure(role.id);

        roleSettings.guildID = message.guild!.id;
        roleSettings.cooldown = cooldown;
        await roles.save(roleSettings);

        return message.channel.send(`Added the role **${role.name}** with a cooldown of *${kFormatter.format(cooldown)}*.`);
    }

}