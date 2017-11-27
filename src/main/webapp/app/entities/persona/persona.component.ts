import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Persona } from './persona.model';
import { PersonaService } from './persona.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-persona',
    templateUrl: './persona.component.html'
})
export class PersonaComponent implements OnInit, OnDestroy {
personas: Persona[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private personaService: PersonaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.personaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.personas = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPersonas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Persona) {
        return item.id;
    }
    registerChangeInPersonas() {
        this.eventSubscriber = this.eventManager.subscribe('personaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
