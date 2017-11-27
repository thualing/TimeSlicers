import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TimelineGroups } from './timeline-groups.model';
import { TimelineGroupsPopupService } from './timeline-groups-popup.service';
import { TimelineGroupsService } from './timeline-groups.service';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-timeline-groups-dialog',
    templateUrl: './timeline-groups-dialog.component.html'
})
export class TimelineGroupsDialogComponent implements OnInit {

    timelineGroups: TimelineGroups;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private timelineGroupsService: TimelineGroupsService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.timelineGroups.id !== undefined) {
            this.subscribeToSaveResponse(
                this.timelineGroupsService.update(this.timelineGroups));
        } else {
            this.subscribeToSaveResponse(
                this.timelineGroupsService.create(this.timelineGroups));
        }
    }

    private subscribeToSaveResponse(result: Observable<TimelineGroups>) {
        result.subscribe((res: TimelineGroups) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TimelineGroups) {
        this.eventManager.broadcast({ name: 'timelineGroupsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-timeline-groups-popup',
    template: ''
})
export class TimelineGroupsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private timelineGroupsPopupService: TimelineGroupsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.timelineGroupsPopupService
                    .open(TimelineGroupsDialogComponent as Component, params['id']);
            } else {
                this.timelineGroupsPopupService
                    .open(TimelineGroupsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
