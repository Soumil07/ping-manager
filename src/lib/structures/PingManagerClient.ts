import { SapphireClient, SapphireClientOptions } from "@sapphire/framework";
import { TaskManager } from "@lib/TaskManager";
import TaskStore from "@lib/structures/TaskStore";

export default class PingManagerClient extends SapphireClient {

    public schedule: TaskManager;

    public constructor(options: SapphireClientOptions) {
        super(options);

        this.schedule = new TaskManager(this);
        this.tasks = new TaskStore();
        this.registerStore(this.tasks);
    }

}
