import type { Connection, Repository } from "typeorm";
import { ScheduleEntity } from "./entities/TaskEntity";
import { connect } from "./database.config";
import { RoleRepository } from "./repositories/RoleRepository";

export class DbSet {

    public readonly schedules: Repository<ScheduleEntity>;
    public readonly roles: RoleRepository;

    public constructor(public connection: Connection) {
        this.schedules = this.connection.getRepository(ScheduleEntity);
        this.roles = this.connection.getCustomRepository(RoleRepository);
    }

    private static instance: DbSet | null = null;
	private static connectPromise: Promise<DbSet> | null;

	public static async connect() {
		return (DbSet.instance ??= await (DbSet.connectPromise ??= connect().then((connection) => {
			DbSet.connectPromise = null;
			return new DbSet(connection);
		})));
	}

}