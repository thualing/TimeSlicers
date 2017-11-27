import { BaseEntity } from './../../shared';

export class Timelines implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public inGroup?: BaseEntity,
    ) {
    }
}
