import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    Name!: string;
    
    @Column()
    LastName!: string;
    
    @Column({unique: true})
    Identification!: string;

    @Column()
    Born!: Date;
    
    @Column({unique: true})
    Email?: string
    
    @Column()
    Password!: string;
}
