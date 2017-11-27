/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { TimeslicersTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PersonaDetailComponent } from '../../../../../../main/webapp/app/entities/persona/persona-detail.component';
import { PersonaService } from '../../../../../../main/webapp/app/entities/persona/persona.service';
import { Persona } from '../../../../../../main/webapp/app/entities/persona/persona.model';

describe('Component Tests', () => {

    describe('Persona Management Detail Component', () => {
        let comp: PersonaDetailComponent;
        let fixture: ComponentFixture<PersonaDetailComponent>;
        let service: PersonaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TimeslicersTestModule],
                declarations: [PersonaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PersonaService,
                    JhiEventManager
                ]
            }).overrideTemplate(PersonaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Persona(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.persona).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
