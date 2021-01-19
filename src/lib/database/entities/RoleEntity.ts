import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class RoleEntity {

    @PrimaryColumn('varchar', { length: 19 })
    public id!: string;

    @Column('integer')
    public cooldown!: number;

    @Column('varchar', { length: 19 })
    public guildID!: string;
}
