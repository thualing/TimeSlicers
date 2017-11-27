import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TimeslicersSharedModule } from '../../shared';
import {
    TimelinesService,
    TimelinesPopupService,
    TimelinesComponent,
    TimelinesDetailComponent,
    TimelinesDialogComponent,
    TimelinesPopupComponent,
    TimelinesDeletePopupComponent,
    TimelinesDeleteDialogComponent,
    timelinesRoute,
    timelinesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...timelinesRoute,
    ...timelinesPopupRoute,
];

@NgModule({
    imports: [
        TimeslicersSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TimelinesComponent,
        TimelinesDetailComponent,
        TimelinesDialogComponent,
        TimelinesDeleteDialogComponent,
        TimelinesPopupComponent,
        TimelinesDeletePopupComponent,
    ],
    entryComponents: [
        TimelinesComponent,
        TimelinesDialogComponent,
        TimelinesPopupComponent,
        TimelinesDeleteDialogComponent,
        TimelinesDeletePopupComponent,
    ],
    providers: [
        TimelinesService,
        TimelinesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TimeslicersTimelinesModule {}
