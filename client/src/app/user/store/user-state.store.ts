import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';

import { UserState } from '../models/user-state';
import { UserStateService } from '../services/user-state.service';
import { AlertService } from '../../services/alert.service';

@Injectable()
export class UserStateStore {
    // Stream of observable userStates
    private _userStates: BehaviorSubject<List<UserState>> = new BehaviorSubject(List([]));
    public userStates: Observable<List<UserState>> = this._userStates.asObservable();

    private _userState: BehaviorSubject<UserState> = new BehaviorSubject<UserState>(null);
    public userState: Observable<UserState> = this._userState.asObservable();

    public currentUserState: UserState = new UserState();

    /** Constructor **/
    constructor(
        private userStateService: UserStateService,
        private alertService: AlertService) {
        this.getAllUserStates();
        this.getMockUser();
    }

    getMockUser() {
        let u: any = {};
        u._id = '12345';
        u._atwork = false;
        u._atlunch = false;
        u.driving = false;
        this._userState.next(u);
    }

    public getCurrentUserState(): UserState {
        let currentUserState = this._userState.getValue();
        return currentUserState;
    }

    public setCurrentUserState(userState: UserState) {
        this._userState.next(userState);
    }

    // Create
    public createUserState(newUserState: UserState): Observable<any> {
        let obs: Observable<any> = this.userStateService.create(newUserState);
        obs.subscribe(
            res => {
                let userStates: List<UserState> = this._userStates.getValue();
                userStates.push(newUserState);
                this._userStates.next(userStates);
            },
            error => {
                console.log(error + ': Add Operation Failed');
            }
        );
        return obs;
    }

    // Read
    public getAllUserStates(): Observable<any> {
        let obs: Observable<any> = this.userStateService.getAll();
        obs.subscribe(
            res => {
                let userStates = res;
                this._userStates.next(userStates);
            },
            err => console.log('Error retrieving UserStates')
        );
        return obs;
    }

    public getUserStateById(_id: string): Observable<any> {
        let obs: Observable<any> = this.userStateService.getById(_id)
        obs.subscribe(
            res => {
                let userState = res;
                this._userState.next(userState);
            },
            err => console.log('Error retrieving UserState')
        );
        return obs;
    }

    // Update
    public updateUserState(updatedUserState: UserState): Observable<any> {
        let obs: Observable<any> = this.userStateService.update(updatedUserState);
        obs.subscribe(
            res => {
                let userStates: List<UserState> = this._userStates.getValue();
                let index = userStates.findIndex((userState) => userState._id === updatedUserState._id);
                userStates[index] = updatedUserState;
                this._userStates.next(userStates);
            },
            error => {
                console.log(error + ': Edit Operation Failed');
            }
        );

        return obs;
    }

    // Delete
    public deleteUserState(deletedUserState: UserState): Observable<any> {
        let obs: Observable<any> = this.userStateService.delete(deletedUserState._id);
        obs.subscribe(
            res => {
                let userStates: List<UserState> = this._userStates.getValue();
                let index = userStates.findIndex((userState) => userState._id === deletedUserState._id);
                userStates.splice(index, 1);
                this._userStates.next(userStates);
            },
            error => {
                console.log(error + ': Delete Operation Failed');
            }
        );

        return obs;
    }

}
