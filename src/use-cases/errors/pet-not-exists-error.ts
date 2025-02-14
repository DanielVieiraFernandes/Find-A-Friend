export class PetNotExistsError extends Error {
    constructor() {
        super('There are no pets in this location')
    }
}