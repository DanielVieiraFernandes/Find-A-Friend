export class UserHaveExistsError extends Error {
    constructor(){
        super('User have exists')
    }
}