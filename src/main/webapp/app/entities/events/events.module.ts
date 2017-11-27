import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TimeslicersSharedModule } from '../../shared';
import {
    EventsService,
    EventsPopupService,
    EventsComponent,
    EventsDetailComponent,
    EventsDialogComponent,
    EventsPopupComponent,
    EventsDeletePopupComponent,
    EventsDeleteDialogComponent,
    eventsRoute,
    eventsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...eventsRoute,
    ...eventsPopupRoute,
];

@NgModule({
    imports: [
        TimeslicersSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EventsComponent,
        EventsDetailComponent,
        EventsDialogComponent,
        EventsDeleteDialogComponent,
        EventsPopupComponent,
        EventsDeletePopupComponent,
    ],
    entryComponents: [
        EventsComponent,
        EventsDialogComponent,
        EventsPopupComponent,
        EventsDeleteDialogComponent,
        EventsDeletePopupComponent,
    ],
    providers: [
        EventsService,
        EventsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TimeslicersEventsModule {}
