import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { TimelineGroups } from './timeline-groups.model';
import { TimelineGroupsService } from './timeline-groups.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-timeline-groups',
    templateUrl: './timeline-groups.component.html'
})
export class TimelineGroupsComponent implements OnInit, OnDestroy {
timelineGroups: TimelineGroups[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private timelineGroupsService: TimelineGroupsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.timelineGroupsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.timelineGroups = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTimelineGroups();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TimelineGroups) {
        return item.id;
    }
    registerChangeInTimelineGroups() {
        this.eventSubscriber = this.eventManager.subscribe('timelineGroupsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
