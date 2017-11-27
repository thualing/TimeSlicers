import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { TimelineGroups } from './timeline-groups.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TimelineGroupsService {

    private resourceUrl = SERVER_API_URL + 'api/timeline-groups';

    constructor(private http: Http) { }

    create(timelineGroups: TimelineGroups): Observable<TimelineGroups> {
        const copy = this.convert(timelineGroups);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(timelineGroups: TimelineGroups): Observable<TimelineGroups> {
        const copy = this.convert(timelineGroups);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TimelineGroups> {
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
     * Convert a returned JSON object to TimelineGroups.
     */
    private convertItemFromServer(json: any): TimelineGroups {
        const entity: TimelineGroups = Object.assign(new TimelineGroups(), json);
        return entity;
    }

    /**
     * Convert a TimelineGroups to a JSON which can be sent to the server.
     */
    private convert(timelineGroups: TimelineGroups): TimelineGroups {
        const copy: TimelineGroups = Object.assign({}, timelineGroups);
        return copy;
    }
}
