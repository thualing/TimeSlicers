import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Timelines } from './timelines.model';
import { TimelinesPopupService } from './timelines-popup.service';
import { TimelinesService } from './timelines.service';

@Component({
    selector: 'jhi-timelines-delete-dialog',
    templateUrl: './timelines-delete-dialog.component.html'
})
export class TimelinesDeleteDialogComponent {

    timelines: Timelines;

    constructor(
        private timelinesService: TimelinesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.timelinesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'timelinesListModification',
                content: 'Deleted an timelines'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-timelines-delete-popup',
    template: ''
})
export class TimelinesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private timelinesPopupService: TimelinesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.timelinesPopupService
                .open(TimelinesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
