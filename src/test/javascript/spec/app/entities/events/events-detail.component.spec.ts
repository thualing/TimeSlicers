/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { TimeslicersTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EventsDetailComponent } from '../../../../../../main/webapp/app/entities/events/events-detail.component';
import { EventsService } from '../../../../../../main/webapp/app/entities/events/events.service';
import { Events } from '../../../../../../main/webapp/app/entities/events/events.model';

describe('Component Tests', () => {

    describe('Events Management Detail Component', () => {
        let comp: EventsDetailComponent;
        let fixture: ComponentFixture<EventsDetailComponent>;
        let service: EventsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TimeslicersTestModule],
                declarations: [EventsDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EventsService,
                    JhiEventManager
                ]
            }).overrideTemplate(EventsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EventsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EventsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Events(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.events).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
