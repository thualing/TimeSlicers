import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TimeslicersSharedModule } from '../../shared';
import { TimeslicersAdminModule } from '../../admin/admin.module';
import {
    PersonaService,
    PersonaPopupService,
    PersonaComponent,
    PersonaDetailComponent,
    PersonaDialogComponent,
    PersonaPopupComponent,
    PersonaDeletePopupComponent,
    PersonaDeleteDialogComponent,
    personaRoute,
    personaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...personaRoute,
    ...personaPopupRoute,
];

@NgModule({
    imports: [
        TimeslicersSharedModule,
        TimeslicersAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PersonaComponent,
        PersonaDetailComponent,
        PersonaDialogComponent,
        PersonaDeleteDialogComponent,
        PersonaPopupComponent,
        PersonaDeletePopupComponent,
    ],
    entryComponents: [
        PersonaComponent,
        PersonaDialogComponent,
        PersonaPopupComponent,
        PersonaDeleteDialogComponent,
        PersonaDeletePopupComponent,
    ],
    providers: [
        PersonaService,
        PersonaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TimeslicersPersonaModule {}
