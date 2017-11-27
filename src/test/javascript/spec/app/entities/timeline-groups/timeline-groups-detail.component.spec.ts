/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { TimeslicersTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TimelineGroupsDetailComponent } from '../../../../../../main/webapp/app/entities/timeline-groups/timeline-groups-detail.component';
import { TimelineGroupsService } from '../../../../../../main/webapp/app/entities/timeline-groups/timeline-groups.service';
import { TimelineGroups } from '../../../../../../main/webapp/app/entities/timeline-groups/timeline-groups.model';

describe('Component Tests', () => {

    describe('TimelineGroups Management Detail Component', () => {
        let comp: TimelineGroupsDetailComponent;
        let fixture: ComponentFixture<TimelineGroupsDetailComponent>;
        let service: TimelineGroupsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TimeslicersTestModule],
                declarations: [TimelineGroupsDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TimelineGroupsService,
                    JhiEventManager
                ]
            }).overrideTemplate(TimelineGroupsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TimelineGroupsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TimelineGroupsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TimelineGroups(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.timelineGroups).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
