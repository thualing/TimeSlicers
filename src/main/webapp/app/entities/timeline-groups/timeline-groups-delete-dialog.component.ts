import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TimelineGroups } from './timeline-groups.model';
import { TimelineGroupsPopupService } from './timeline-groups-popup.service';
import { TimelineGroupsService } from './timeline-groups.service';

@Component({
    selector: 'jhi-timeline-groups-delete-dialog',
    templateUrl: './timeline-groups-delete-dialog.component.html'
})
export class TimelineGroupsDeleteDialogComponent {

    timelineGroups: TimelineGroups;

    constructor(
        private timelineGroupsService: TimelineGroupsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.timelineGroupsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'timelineGroupsListModification',
                content: 'Deleted an timelineGroups'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-timeline-groups-delete-popup',
    template: ''
})
export class TimelineGroupsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private timelineGroupsPopupService: TimelineGroupsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.timelineGroupsPopupService
                .open(TimelineGroupsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
