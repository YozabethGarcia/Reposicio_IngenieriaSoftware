
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { ORMContext, CResponse } from '../types';
import argon2 from 'argon2';
import { User } from "./entity/User";

@Resolver()
export class UserResolver {
    @Mutation(() => CResponse)
    async register(
        @Arg('name', () => String) name: string,
        @Arg('email', () => String) email: string,
        @Arg('password', () => String) password: string,
        @Ctx() { req, transport }: ORMContext
    ): Promise<CResponse> {

        const hash = await argon2.hash(password);
        const user = User.create({ email: email, name: name, password: hash });

        try {
            await user.save();
        } catch (error) {
            if (error.code == "ER_DUP_ENTRY") {
                return {
                    errors: [
                        {
                            field: "email",
                            message: "Este correo ya está registrado"
                        }
                    ]
                }
            }
        };

        // Envia cookie para iniciar sesion al registrarse
        req.session.userID = user.id;

        try{
            await transport.sendMail({
                from: '"Apollo Academy" <apolloacademyedu@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "ApolloAcademy - Bienvenido", // Subject line
                text: "Bienvenido", // plain text body
                html: `<div style="margin: 4rem; background-color: LightGray; text-align: center; height: 500px">
                <div style="">
                  <h1>Bienvenido/a a ApolloAcademy</h1>
                  <div style="background-color: white; margin: 0 4rem 4rem 4rem; height:400px">
                    <div style="padding-top: 4rem">
                      <h2> ${user.name} te damos la bienvenida a Apollo Academy</h2>
                      <p>Para ingresar a nuestra aplicación puedes ingresar en el siguiente enlace: <a href="https://localhost" target="_blank">Apollo Academy</a></p>
                    </div>
                    <div style="display: flex; margin: 4rem 10rem 0 10rem">
                      
                    </div>
                  </div>
                </div>
              </div>`, // html body
            });
        }catch(e)
        {

        }
        return { user };
    }
}