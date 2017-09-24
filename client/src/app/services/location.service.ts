import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Location } from '../models/location';

@Injectable()
export class LocationService {

  constructor(private http: Http) { }

    getAll() {
        return this.http.get('/location').map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get('/location/' + _id).map((response: Response) => response.json());
    }

    create(location: Location) {
        return this.http.post('/location/', location);
    }

    update(location: Location) {
        return this.http.put('/location/' + location._id, location);
    }

    delete(_id: string) {
        return this.http.delete('/location/' + _id);
    }
}
