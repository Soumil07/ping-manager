import { PGSQL_ENABLED } from "@root/config";
import { Event, Events, PieceContext } from "@sapphire/framework";

export default class extends Event<Events.Ready> {

    public constructor(context: PieceContext) {
        super(context, {
            event: Events.Ready,
            once: true
        });
    }

    public async run() {
        const { client } = this.context;
        if (PGSQL_ENABLED) await client.schedule.init();
        client.logger.info(`Ready to serve ${client.guilds.cache.size} guilds!`);
    }
    
}
