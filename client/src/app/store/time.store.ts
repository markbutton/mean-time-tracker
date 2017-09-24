import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';

import { Time } from '../models/time';
import { TimeService } from '../services/time.service';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class TimeStore {
    // Stream of observable times
    private _times: BehaviorSubject<List<Time>> = new BehaviorSubject(List([]));
    public times: Observable<List<Time>> = this._times.asObservable();

    private _time: BehaviorSubject<Time> = new BehaviorSubject<Time>(null);
    public time: Observable<Time> = this._time.asObservable();

    /** Constructor **/
    constructor(
        private timeService: TimeService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {
        //this.getAllTimes();
    }

    // Create
    public createTime(newTime: Time): Observable<any> {
        let obs: Observable<any> = this.timeService.create(newTime);
        obs.subscribe(
            res => {
                let times: List<Time> = this._times.getValue();
                times.push(newTime);
                this._times.next(times);
            },
            error => {
                console.log(error + ': Add Operation Failed');
            }
        );
        return obs;
    }

    // Read
    public getAllTimes(): Observable<any> {
        let obs: Observable<any> = this.timeService.getAll();
        obs.subscribe(
            res => {
                let times = res;
                this._times.next(times);
            },
            err => console.log('Error retrieving Times')
        );
        return obs;
    }

    public getTimeById(_id: string): Observable<any> {
        let obs: Observable<any> = this.timeService.getById(_id)
        obs.subscribe(
            res => {
                let time = res;
                this._time.next(time);
            },
            err => console.log('Error retrieving Time')
        );
        return obs;
    }

    public getOpen(userId: string, timeType: string): Observable<any> {
        let obs: Observable<any> = this.timeService.getOpen(userId, timeType)
        obs.subscribe(
            res => {
                let time = res;
                this._time.next(time);
            },
            err => console.log('Error searching for Time')
        );
        return obs;
    }

    // Update
    public updateTime(updatedTime: Time): Observable<any> {
        let obs: Observable<any> = this.timeService.update(updatedTime);
        obs.subscribe(
            res => {
                let times: List<Time> = this._times.getValue();
                let index = times.findIndex((time) => time._id === updatedTime._id);
                times[index] = updatedTime;
                this._times.next(times);
            },
            error => {
                console.log(error + ': Edit Operation Failed');
            }
        );

        return obs;
    }

    // Delete
    public deleteTime(deletedTime: Time): Observable<any> {
        let obs: Observable<any> = this.timeService.delete(deletedTime._id);
        obs.subscribe(
            res => {
                let times: List<Time> = this._times.getValue();
                let index = times.findIndex((time) => time._id === deletedTime._id);
                times.splice(index, 1);
                this._times.next(times);
            },
            error => {
                console.log(error + ': Delete Operation Failed');
            }
        );

        return obs;
    }

}
