import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TimeslicersTimelineGroupsModule } from './timeline-groups/timeline-groups.module';
import { TimeslicersTimelinesModule } from './timelines/timelines.module';
import { TimeslicersEventsModule } from './events/events.module';
import { TimeslicersLocationModule } from './location/location.module';
import { TimeslicersItemModule } from './item/item.module';
import { TimeslicersPersonaModule } from './persona/persona.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TimeslicersTimelineGroupsModule,
        TimeslicersTimelinesModule,
        TimeslicersEventsModule,
        TimeslicersLocationModule,
        TimeslicersItemModule,
        TimeslicersPersonaModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TimeslicersEntityModule {}
