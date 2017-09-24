import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';

import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class UserStore {
    // Stream of observable users
    private _users: BehaviorSubject<List<User>> = new BehaviorSubject(List([]));
    public users: Observable<List<User>> = this._users.asObservable();

    private _user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    public user: Observable<User> = this._user.asObservable();

    /** Constructor **/
    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private ngZone: NgZone) {
        //this.getAllUsers();
    }

    public getMyUser(_id): User {
        let myUser: User;
        this.userService.getById(_id);
        return myUser;
    }

    public getCurrentUser(): User {
        let currentUser = this._user.getValue();
        return currentUser;
    }

    public setCurrentUser(user: User) {
        this._user.next(user);
    }

    // Create
    public createUser(newUser: User): Observable<any> {
        // create an observable variable
        let obs: Observable<any> = this.userService.create(newUser);
        // subscribe to the observable handle response and error
        obs.subscribe(
            res => {
                let users: List<User> = this._users.getValue();
                users.push(newUser);
                this._users.next(users);
            },
            error => {
                // log add error
                console.log(error + ': Add Operation Failed');
            }
        );
        return obs;
    }

    // Read
    public getAllUsers(): Observable<any> {
        // Get users and subscribe
        let obs: Observable<any> = this.userService.getAll();
        obs.subscribe(
            res => {
                let users = res;
                this._users.next(users);
            },
            err => console.log('Error retrieving Users')
        );
        return obs;
    }

    // Read
    public getUserById(_id: string): Observable<any> {
        let obs: Observable<any> = this.userService.getById(_id)
        obs.subscribe(
            res => {
                let user = res;
                //this.cachedUser = user;
                this._user.next(user);
            },
            err => console.log('Error retrieving User')
        );
        return obs;
    }

    // Update
    public updateUser(updatedUser: User): Observable<any> {
        // create an observable variable
        let obs: Observable<any> = this.userService.update(updatedUser);
        // subscribe to the observable handle response and error
        obs.subscribe(
            res => {
                let users: List<User> = this._users.getValue();
                let index = users.findIndex((user) => user._id === updatedUser._id);
                users[index] = updatedUser;
                this._users.next(users);
                //this._user.next(updatedUser);
                this.setCurrentUser(updatedUser);
            },
            error => {
                // log edit error
                console.log(error + ': Edit Operation Failed');
            }
        );

        return obs;
    }

    // Delete
    public deleteUser(deletedUser: User): Observable<any> {
        // create an observable variable
        let obs: Observable<any> = this.userService.delete(deletedUser._id);
        // subscribe to the observable handle response and error
        obs.subscribe(
            res => {
                let users: List<User> = this._users.getValue();
                let index = users.findIndex((user) => user._id === deletedUser._id);
                users.splice(index, 1);
                this._users.next(users);
            },
            error => {
                // log delete error
                console.log(error + ': Delete Operation Failed');
            }
        );

        return obs;
    }

    // Custom
    login(username: string, password: string): Observable<any> {
        let obs: Observable<any> = this.authenticationService.login(username, password)
        obs.subscribe(
            data => {
                this.getUserById(data._id);
            },
            error => {
                this.alertService.error(error);
            }
        );

        return obs;
    }

}
