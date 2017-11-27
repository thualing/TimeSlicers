import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { TimelineGroups } from './timeline-groups.model';
import { TimelineGroupsService } from './timeline-groups.service';

@Component({
    selector: 'jhi-timeline-groups-detail',
    templateUrl: './timeline-groups-detail.component.html'
})
export class TimelineGroupsDetailComponent implements OnInit, OnDestroy {

    timelineGroups: TimelineGroups;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private timelineGroupsService: TimelineGroupsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTimelineGroups();
    }

    load(id) {
        this.timelineGroupsService.find(id).subscribe((timelineGroups) => {
            this.timelineGroups = timelineGroups;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTimelineGroups() {
        this.eventSubscriber = this.eventManager.subscribe(
            'timelineGroupsListModification',
            (response) => this.load(this.timelineGroups.id)
        );
    }
}
