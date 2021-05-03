import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { Field, ID, ObjectType } from 'type-graphql';

@Entity()
export class User {
    
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;
    
    @Field(() => String)
    @Column()
    Name!: string;
    
    @Field(() => String)
    @Column()
    LastName!: string;
    

    @Field(() => String)
    @Column({unique: true})
    Identification!: string;
   
    @Field(() => Date)
    @Column()
    Born!: Date;
    
    @Field(() => String)
    @Column({unique: true})
    Email?: string

    @Column()
    Password!: string;

}
