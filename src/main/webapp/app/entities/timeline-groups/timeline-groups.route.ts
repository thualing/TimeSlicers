import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TimelineGroupsComponent } from './timeline-groups.component';
import { TimelineGroupsDetailComponent } from './timeline-groups-detail.component';
import { TimelineGroupsPopupComponent } from './timeline-groups-dialog.component';
import { TimelineGroupsDeletePopupComponent } from './timeline-groups-delete-dialog.component';

export const timelineGroupsRoute: Routes = [
    {
        path: 'timeline-groups',
        component: TimelineGroupsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TimelineGroups'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'timeline-groups/:id',
        component: TimelineGroupsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TimelineGroups'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const timelineGroupsPopupRoute: Routes = [
    {
        path: 'timeline-groups-new',
        component: TimelineGroupsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TimelineGroups'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'timeline-groups/:id/edit',
        component: TimelineGroupsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TimelineGroups'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'timeline-groups/:id/delete',
        component: TimelineGroupsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TimelineGroups'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
