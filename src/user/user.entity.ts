import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('user')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id!: string;

    @Column({ name: 'first_name', nullable: false })
    firstName!: string

    @Column({ name: 'second_name', nullable: false })
    secondName!: string

    @Column()
    age!: number

    @Column({ unique: true, nullable: false })
    email!: string

    @Column({ name: 'password_hash', nullable: false, select: false })
    passwordHash!: string
}