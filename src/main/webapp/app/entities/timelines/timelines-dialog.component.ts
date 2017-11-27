import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Timelines } from './timelines.model';
import { TimelinesPopupService } from './timelines-popup.service';
import { TimelinesService } from './timelines.service';
import { TimelineGroups, TimelineGroupsService } from '../timeline-groups';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-timelines-dialog',
    templateUrl: './timelines-dialog.component.html'
})
export class TimelinesDialogComponent implements OnInit {

    timelines: Timelines;
    isSaving: boolean;

    timelinegroups: TimelineGroups[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private timelinesService: TimelinesService,
        private timelineGroupsService: TimelineGroupsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.timelineGroupsService.query()
            .subscribe((res: ResponseWrapper) => { this.timelinegroups = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.timelines.id !== undefined) {
            this.subscribeToSaveResponse(
                this.timelinesService.update(this.timelines));
        } else {
            this.subscribeToSaveResponse(
                this.timelinesService.create(this.timelines));
        }
    }

    private subscribeToSaveResponse(result: Observable<Timelines>) {
        result.subscribe((res: Timelines) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Timelines) {
        this.eventManager.broadcast({ name: 'timelinesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTimelineGroupsById(index: number, item: TimelineGroups) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-timelines-popup',
    template: ''
})
export class TimelinesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private timelinesPopupService: TimelinesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.timelinesPopupService
                    .open(TimelinesDialogComponent as Component, params['id']);
            } else {
                this.timelinesPopupService
                    .open(TimelinesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
