import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EventsComponent } from './events.component';
import { EventsDetailComponent } from './events-detail.component';
import { EventsPopupComponent } from './events-dialog.component';
import { EventsDeletePopupComponent } from './events-delete-dialog.component';

export const eventsRoute: Routes = [
    {
        path: 'events',
        component: EventsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Events'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'events/:id',
        component: EventsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Events'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const eventsPopupRoute: Routes = [
    {
        path: 'events-new',
        component: EventsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Events'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'events/:id/edit',
        component: EventsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Events'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'events/:id/delete',
        component: EventsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Events'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
