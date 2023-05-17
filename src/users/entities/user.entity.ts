import { Entity, Column, BeforeInsert, PrimaryGeneratedColumn } from 'typeorm';
import * as argon2 from 'argon2';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password);
    }

    @Column({ default: true })
    isActive: boolean;
}
