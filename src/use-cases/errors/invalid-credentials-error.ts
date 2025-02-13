export class InvalidCredentialsError extends Error {
    constructor(){
        super('Invalid credential, verify and try again')
    }
}