import { it, describe, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { AuthenticateUserUseCase } from "./authenticate-user";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let userRepository: InMemoryUsersRepository;
let sut: AuthenticateUserUseCase;

describe('Authenticate User Test', () => {

    beforeEach(() => {
        userRepository = new InMemoryUsersRepository();
        sut = new AuthenticateUserUseCase(userRepository);
    });

    it('Should be able authenticate User', async () => {


        await userRepository.create({
            password_hash: await hash('123456', 6),
            age: '18',
            email: 'daniel@gmail.com',
            name: 'Daniel',
            address: 'Rua jerônimo batista fabiano, 613',
            city: 'Hortolândia'
        })

        const { user } = await sut.execute({
            email: 'daniel@gmail.com',
            password: '123456'
        })


        expect(user.id).toEqual(expect.any(String))
        expect(user).toEqual(expect.objectContaining({
            age: '18',
            email: 'daniel@gmail.com',
            name: 'Daniel',
        }))

    })

    it('Should be able authenticate User with invalid password', async () => {


        await userRepository.create({
            password_hash: await hash('123456', 6),
            age: '18',
            email: 'daniel@gmail.com',
            name: 'Daniel',
            address: 'Rua jerônimo batista fabiano, 613',
            city: 'Hortolândia'
        })

        await expect(() => sut.execute({
            email: 'daniel@gmail.com',
            password: '123457777'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)


    })


}
)
