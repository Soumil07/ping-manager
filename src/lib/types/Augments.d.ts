import type TaskStore from "../structures/TaskStore";
import type { TaskManager } from "../TaskManager";

declare module '@sapphire/framework' {
    interface ArgType {
        duration: number;
    }

    interface SapphireClient {
        schedule: TaskManager;
        tasks: TaskStore;
    }
}

declare module 'discord.js' {
    interface ClientOptions {
        schedule?: {
            interval?: number;
        }
    }
}
