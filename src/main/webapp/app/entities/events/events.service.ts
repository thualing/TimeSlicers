import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Events } from './events.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EventsService {

    private resourceUrl = SERVER_API_URL + 'api/events';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(events: Events): Observable<Events> {
        const copy = this.convert(events);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(events: Events): Observable<Events> {
        const copy = this.convert(events);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Events> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Events.
     */
    private convertItemFromServer(json: any): Events {
        const entity: Events = Object.assign(new Events(), json);
        entity.timeOfEvent = this.dateUtils
            .convertDateTimeFromServer(json.timeOfEvent);
        return entity;
    }

    /**
     * Convert a Events to a JSON which can be sent to the server.
     */
    private convert(events: Events): Events {
        const copy: Events = Object.assign({}, events);

        copy.timeOfEvent = this.dateUtils.toDate(events.timeOfEvent);
        return copy;
    }
}
