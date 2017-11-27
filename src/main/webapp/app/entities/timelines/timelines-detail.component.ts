import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Timelines } from './timelines.model';
import { TimelinesService } from './timelines.service';

@Component({
    selector: 'jhi-timelines-detail',
    templateUrl: './timelines-detail.component.html'
})
export class TimelinesDetailComponent implements OnInit, OnDestroy {

    timelines: Timelines;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private timelinesService: TimelinesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTimelines();
    }

    load(id) {
        this.timelinesService.find(id).subscribe((timelines) => {
            this.timelines = timelines;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTimelines() {
        this.eventSubscriber = this.eventManager.subscribe(
            'timelinesListModification',
            (response) => this.load(this.timelines.id)
        );
    }
}
