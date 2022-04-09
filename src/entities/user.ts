import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {guildSettingsInterface} from "../interfaces/guild";

@Entity("user")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    _id: string;

    @Column("varchar")
    id: string;

    @Column("longtext")
    data: guildSettingsInterface;

    @CreateDateColumn()
    createdAt: number;
}