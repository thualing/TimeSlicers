import { BaseEntity, User } from './../../shared';

export class Persona implements BaseEntity {
    constructor(
        public id?: number,
        public name?: User,
        public attends?: BaseEntity[],
    ) {
    }
}
