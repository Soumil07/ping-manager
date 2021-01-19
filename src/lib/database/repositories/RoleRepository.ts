import { EntityRepository, FindOneOptions, Repository } from "typeorm";
import RoleEntity from "../entities/RoleEntity";

@EntityRepository(RoleEntity)
export class RoleRepository extends Repository<RoleEntity> {

    public async ensure(id: string, options?: FindOneOptions<RoleEntity>) {
        const previous = await this.findOne(id, options);
        if (previous) return previous;

        const data = new RoleEntity();
        data.id = id;

        return data;
    }

}