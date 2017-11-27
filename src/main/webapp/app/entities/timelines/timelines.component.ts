import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Timelines } from './timelines.model';
import { TimelinesService } from './timelines.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-timelines',
    templateUrl: './timelines.component.html'
})
export class TimelinesComponent implements OnInit, OnDestroy {
timelines: Timelines[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private timelinesService: TimelinesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.timelinesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.timelines = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTimelines();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Timelines) {
        return item.id;
    }
    registerChangeInTimelines() {
        this.eventSubscriber = this.eventManager.subscribe('timelinesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
