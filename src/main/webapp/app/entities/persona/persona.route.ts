import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PersonaComponent } from './persona.component';
import { PersonaDetailComponent } from './persona-detail.component';
import { PersonaPopupComponent } from './persona-dialog.component';
import { PersonaDeletePopupComponent } from './persona-delete-dialog.component';

export const personaRoute: Routes = [
    {
        path: 'persona',
        component: PersonaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Personas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'persona/:id',
        component: PersonaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Personas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personaPopupRoute: Routes = [
    {
        path: 'persona-new',
        component: PersonaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Personas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'persona/:id/edit',
        component: PersonaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Personas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'persona/:id/delete',
        component: PersonaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Personas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
