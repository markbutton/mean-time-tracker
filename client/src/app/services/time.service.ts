import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Time } from '../models/time';

@Injectable()
export class TimeService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/time').map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get('/time/' + _id).map((response: Response) => response.json());
    }

    getOpen(userId: string, timeType: string) {
        return this.http.post('/time/open', { userId: userId, timeType: timeType })
        .map((response: Response) => response.json());
    }

    create(time: Time) {
        return this.http.post('/time/', time);
    }

    update(time: Time) {
        return this.http.put('/time/' + time._id, time);
    }

    delete(_id: string) {
        return this.http.delete('/time/' + _id);
    }

}
