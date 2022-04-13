import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity("guild_warning")
export class GuildWarning extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    _id: string;

    @Column("varchar")
    guild_id: string;

    @Column("varchar")
    author_id: string;

    @Column("varchar")
    user_id: string;

    @Column("text")
    reason: string;

    @CreateDateColumn()
    createdAt: number;
}