import { DbSet } from '@lib/database/DbSet';
import { Event, Events, PieceContext } from '@sapphire/framework';
import type { Message } from 'discord.js';

export default class extends Event<Events.Message> {

    public constructor(context: PieceContext) {
        super(context, {
            event: Events.Message
        });
    }

    public async run(message: Message) {
        if (!message.guild) return;

        const { roles: roleSettings } = await DbSet.connect();
        const roles = await roleSettings.find({
            where: {
                guildID: message.guild.id
            }
        });

        for (const role of roles) {
            if (!message.mentions.roles.has(role.id)) continue;
            const discordRole = message.guild.roles.cache.get(role.id)!;
            await discordRole.setMentionable(false, 'Role pinged once.').catch(() => null);

            await this.context.client.schedule.add('releaseRoleMentions', Date.now() + role.cooldown, {
                data: {
                    guildID: message.guild.id,
                    roleID: role.id
                }
            })
        }
    }

}