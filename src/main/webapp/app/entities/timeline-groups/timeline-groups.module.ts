import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TimeslicersSharedModule } from '../../shared';
import { TimeslicersAdminModule } from '../../admin/admin.module';
import {
    TimelineGroupsService,
    TimelineGroupsPopupService,
    TimelineGroupsComponent,
    TimelineGroupsDetailComponent,
    TimelineGroupsDialogComponent,
    TimelineGroupsPopupComponent,
    TimelineGroupsDeletePopupComponent,
    TimelineGroupsDeleteDialogComponent,
    timelineGroupsRoute,
    timelineGroupsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...timelineGroupsRoute,
    ...timelineGroupsPopupRoute,
];

@NgModule({
    imports: [
        TimeslicersSharedModule,
        TimeslicersAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TimelineGroupsComponent,
        TimelineGroupsDetailComponent,
        TimelineGroupsDialogComponent,
        TimelineGroupsDeleteDialogComponent,
        TimelineGroupsPopupComponent,
        TimelineGroupsDeletePopupComponent,
    ],
    entryComponents: [
        TimelineGroupsComponent,
        TimelineGroupsDialogComponent,
        TimelineGroupsPopupComponent,
        TimelineGroupsDeleteDialogComponent,
        TimelineGroupsDeletePopupComponent,
    ],
    providers: [
        TimelineGroupsService,
        TimelineGroupsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TimeslicersTimelineGroupsModule {}
