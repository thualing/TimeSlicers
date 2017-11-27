import { BaseEntity } from './../../shared';

export class Events implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public timeOfEvent?: any,
        public description?: string,
        public inTimeline?: BaseEntity,
        public occursAt?: BaseEntity,
        public participants?: BaseEntity[],
        public hasItems?: BaseEntity[],
    ) {
    }
}
