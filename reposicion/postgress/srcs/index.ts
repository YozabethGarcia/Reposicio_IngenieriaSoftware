import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";

function AddUser(name:string, lastname: string, identification: string, born: Date, email: string, password: string ) {
    createConnection().then(async connection => {
    
        console.log("Inserting a new user into the database...");
        const user = new User();
        user.Name = name;
        user.LastName = lastname;
        user.Identification = identification;
        user.Born = born;
        user.Email = email;
        user.Password = password;
        await connection.manager.save(user);
        console.log("Saved a new user with id: " + user.id);
        console.log("Loading users from the database...");
        const users = await connection.manager.find(User);
        console.log("Loaded users: ", users);
    
        console.log("Here you can setup and run express/koa/any other framework.");
    
    }).catch(error => console.log(error));
}
export default AddUser