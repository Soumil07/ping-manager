import Task from "@lib/structures/Task";
import { PartialResponseValue, ResponseType } from "@root/lib/database/entities/TaskEntity";

export default class extends Task {

    public async run(data: ReleaseRoleMentionData): Promise<PartialResponseValue> {
        const guild = this.context.client.guilds.cache.get(data.guildID);
        if (!guild) return { type: ResponseType.Finished };
        const role = guild.roles.cache.get(data.roleID);
        if (!role || !guild.me?.permissions.has('MANAGE_ROLES') || guild.me?.roles.highest.position < role.position) return { type: ResponseType.Finished };

        try {
            await role.setMentionable(true, 'Cooldown period complete.');
        } catch (error) {
            this.context.client.logger.error(error);
        } finally {
            return { type: ResponseType.Finished };
        }
    }

}

export interface ReleaseRoleMentionData {
    guildID: string;
    roleID: string;
}
