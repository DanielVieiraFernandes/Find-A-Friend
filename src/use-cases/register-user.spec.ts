import { it, describe, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { RegisterUserUseCase, Sex } from "./register-user";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUserUseCase;

describe('Register User Test', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new RegisterUserUseCase(usersRepository);
    });

    it('Should be able register User', async () => {

        const { user } = await sut.execute({
            age: '18',
            email: 'daniel@gmail.com',
            name: 'Daniel',
            password: '123456',
            sex: Sex.MALE,
            address: 'Rua São Paulo',
            city: 'Hortolândia'
        })

        console.log(user)

        expect(user.id).toEqual(expect.any(String))

    });


    it('Should be able register user with twice emails', async () => {
        await sut.execute({
            age: '18',
            email: 'daniel@gmail.com',
            name: 'Daniel',
            password: '123456',
            sex: Sex.MALE,
            address: 'Rua São Paulo',
            city: 'Hortolândia'
        })


        await expect(() => sut.execute({
            age: '18',
            email: 'daniel@gmail.com',
            name: 'Daniel',
            password: '123456',
            sex: Sex.MALE,
            address: 'Rua São Paulo',
            city: 'Hortolândia'
        })).rejects.toBeInstanceOf(Error)
    });

}
)

