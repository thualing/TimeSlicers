import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Persona } from './persona.model';
import { PersonaService } from './persona.service';

@Component({
    selector: 'jhi-persona-detail',
    templateUrl: './persona-detail.component.html'
})
export class PersonaDetailComponent implements OnInit, OnDestroy {

    persona: Persona;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private personaService: PersonaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPersonas();
    }

    load(id) {
        this.personaService.find(id).subscribe((persona) => {
            this.persona = persona;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPersonas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'personaListModification',
            (response) => this.load(this.persona.id)
        );
    }
}
