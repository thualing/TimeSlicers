import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Events } from './events.model';
import { EventsPopupService } from './events-popup.service';
import { EventsService } from './events.service';
import { Timelines, TimelinesService } from '../timelines';
import { Location, LocationService } from '../location';
import { Persona, PersonaService } from '../persona';
import { Item, ItemService } from '../item';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-events-dialog',
    templateUrl: './events-dialog.component.html'
})
export class EventsDialogComponent implements OnInit {

    events: Events;
    isSaving: boolean;

    timelines: Timelines[];

    locations: Location[];

    personas: Persona[];

    items: Item[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private eventsService: EventsService,
        private timelinesService: TimelinesService,
        private locationService: LocationService,
        private personaService: PersonaService,
        private itemService: ItemService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.timelinesService.query()
            .subscribe((res: ResponseWrapper) => { this.timelines = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.locationService.query()
            .subscribe((res: ResponseWrapper) => { this.locations = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.personaService.query()
            .subscribe((res: ResponseWrapper) => { this.personas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.itemService.query()
            .subscribe((res: ResponseWrapper) => { this.items = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.events.id !== undefined) {
            this.subscribeToSaveResponse(
                this.eventsService.update(this.events));
        } else {
            this.subscribeToSaveResponse(
                this.eventsService.create(this.events));
        }
    }

    private subscribeToSaveResponse(result: Observable<Events>) {
        result.subscribe((res: Events) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Events) {
        this.eventManager.broadcast({ name: 'eventsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTimelinesById(index: number, item: Timelines) {
        return item.id;
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }

    trackPersonaById(index: number, item: Persona) {
        return item.id;
    }

    trackItemById(index: number, item: Item) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-events-popup',
    template: ''
})
export class EventsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eventsPopupService: EventsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.eventsPopupService
                    .open(EventsDialogComponent as Component, params['id']);
            } else {
                this.eventsPopupService
                    .open(EventsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
