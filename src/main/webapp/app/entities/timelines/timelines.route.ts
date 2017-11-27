import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TimelinesComponent } from './timelines.component';
import { TimelinesDetailComponent } from './timelines-detail.component';
import { TimelinesPopupComponent } from './timelines-dialog.component';
import { TimelinesDeletePopupComponent } from './timelines-delete-dialog.component';

export const timelinesRoute: Routes = [
    {
        path: 'timelines',
        component: TimelinesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Timelines'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'timelines/:id',
        component: TimelinesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Timelines'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const timelinesPopupRoute: Routes = [
    {
        path: 'timelines-new',
        component: TimelinesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Timelines'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'timelines/:id/edit',
        component: TimelinesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Timelines'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'timelines/:id/delete',
        component: TimelinesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Timelines'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
