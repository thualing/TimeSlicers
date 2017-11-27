/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { TimeslicersTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TimelinesDetailComponent } from '../../../../../../main/webapp/app/entities/timelines/timelines-detail.component';
import { TimelinesService } from '../../../../../../main/webapp/app/entities/timelines/timelines.service';
import { Timelines } from '../../../../../../main/webapp/app/entities/timelines/timelines.model';

describe('Component Tests', () => {

    describe('Timelines Management Detail Component', () => {
        let comp: TimelinesDetailComponent;
        let fixture: ComponentFixture<TimelinesDetailComponent>;
        let service: TimelinesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TimeslicersTestModule],
                declarations: [TimelinesDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TimelinesService,
                    JhiEventManager
                ]
            }).overrideTemplate(TimelinesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TimelinesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TimelinesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Timelines(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.timelines).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
