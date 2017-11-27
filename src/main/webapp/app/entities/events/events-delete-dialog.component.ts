import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Events } from './events.model';
import { EventsPopupService } from './events-popup.service';
import { EventsService } from './events.service';

@Component({
    selector: 'jhi-events-delete-dialog',
    templateUrl: './events-delete-dialog.component.html'
})
export class EventsDeleteDialogComponent {

    events: Events;

    constructor(
        private eventsService: EventsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.eventsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'eventsListModification',
                content: 'Deleted an events'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-events-delete-popup',
    template: ''
})
export class EventsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eventsPopupService: EventsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.eventsPopupService
                .open(EventsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
