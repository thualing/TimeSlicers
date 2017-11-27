import { BaseEntity, User } from './../../shared';

export class TimelineGroups implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public owner?: User,
    ) {
    }
}
