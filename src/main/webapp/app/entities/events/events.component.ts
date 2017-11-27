import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Events } from './events.model';
import { EventsService } from './events.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-events',
    templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit, OnDestroy {
events: Events[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private eventsService: EventsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.eventsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.events = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEvents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Events) {
        return item.id;
    }
    registerChangeInEvents() {
        this.eventSubscriber = this.eventManager.subscribe('eventsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
