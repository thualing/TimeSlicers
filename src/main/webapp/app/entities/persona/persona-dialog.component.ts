import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Persona } from './persona.model';
import { PersonaPopupService } from './persona-popup.service';
import { PersonaService } from './persona.service';
import { User, UserService } from '../../shared';
import { Events, EventsService } from '../events';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-persona-dialog',
    templateUrl: './persona-dialog.component.html'
})
export class PersonaDialogComponent implements OnInit {

    persona: Persona;
    isSaving: boolean;

    users: User[];

    events: Events[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private personaService: PersonaService,
        private userService: UserService,
        private eventsService: EventsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.eventsService.query()
            .subscribe((res: ResponseWrapper) => { this.events = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.persona.id !== undefined) {
            this.subscribeToSaveResponse(
                this.personaService.update(this.persona));
        } else {
            this.subscribeToSaveResponse(
                this.personaService.create(this.persona));
        }
    }

    private subscribeToSaveResponse(result: Observable<Persona>) {
        result.subscribe((res: Persona) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Persona) {
        this.eventManager.broadcast({ name: 'personaListModification', content: 'OK'});
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

    trackEventsById(index: number, item: Events) {
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
    selector: 'jhi-persona-popup',
    template: ''
})
export class PersonaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personaPopupService: PersonaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.personaPopupService
                    .open(PersonaDialogComponent as Component, params['id']);
            } else {
                this.personaPopupService
                    .open(PersonaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
