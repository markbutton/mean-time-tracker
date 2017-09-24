import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { UserState } from '../models/user-state';

@Injectable()
export class UserStateService {

  constructor(private http: Http) { }

    getAll() {
        return this.http.get('/userState').map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get('/userState/' + _id).map((response: Response) => response.json());
    }

    create(userState: UserState) {
        return this.http.post('/userState/', userState);
    }

    update(userState: UserState) {
        return this.http.put('/userState/' + userState._id, userState);
    }

    delete(_id: string) {
        return this.http.delete('/userState/' + _id);
    }

}
