import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';

import { Location } from '../models/location';
import { LocationService } from '../services/location.service';
import { AlertService } from '../services/alert.service';

@Injectable()
export class LocationStore {
    // Stream of observable locations
    private _locations: BehaviorSubject<List<Location>> = new BehaviorSubject(List([]));
    public locations: Observable<List<Location>> = this._locations.asObservable();

    private _location: BehaviorSubject<Location> = new BehaviorSubject<Location>(null);
    public location: Observable<Location> = this._location.asObservable();

    /** Constructor **/
    constructor(
        private locationService: LocationService,
        private alertService: AlertService) {
        //this.getAllLocations();
    }

    setLocation(location: Location) {
        localStorage.setItem('selectedLocation', JSON.stringify(location));
    }

    getLocation(): Location {
        let sl: Location;
        sl = JSON.parse(localStorage.getItem('selectedLocation'));
        return sl;
    }

    // Create
    public createLocation(newLocation: Location): Observable<any> {
        let obs: Observable<any> = this.locationService.create(newLocation);
        obs.subscribe(
            res => {
                let locations: List<Location> = this._locations.getValue();
                locations.push(newLocation);
                this._locations.next(locations);
            },
            error => {
                console.log(error + ': Add Operation Failed');
            }
        );
        return obs;
    }

    // Read
    public getAllLocations(): Observable<any> {
        let obs: Observable<any> = this.locationService.getAll();
        obs.subscribe(
            res => {
                let locations = res;
                this._locations.next(locations);
            },
            err => console.log('Error retrieving Locations')
        );
        return obs;
    }

    // Read
    public getLocationById(_id: string): Observable<any> {
        let obs: Observable<any> = this.locationService.getById(_id)
        obs.subscribe(
            res => {
                let location = res;
                this._location.next(location);
            },
            err => console.log('Error retrieving Location')
        );
        return obs;
    }

    // Update
    public updateLocation(updatedLocation: Location): Observable<any> {
        let obs: Observable<any> = this.locationService.update(updatedLocation);
        obs.subscribe(
            res => {
                let locations: List<Location> = this._locations.getValue();
                let index = locations.findIndex((location) => location._id === updatedLocation._id);
                locations[index] = updatedLocation;
                this._locations.next(locations);
            },
            error => {
                console.log(error + ': Edit Operation Failed');
            }
        );

        return obs;
    }

    // Delete
    public deleteLocation(deletedLocation: Location): Observable<any> {
        let obs: Observable<any> = this.locationService.delete(deletedLocation._id);
        obs.subscribe(
            res => {
                let locations: List<Location> = this._locations.getValue();
                let index = locations.findIndex((location) => location._id === deletedLocation._id);
                locations.splice(index, 1);
                this._locations.next(locations);
            },
            error => {
                console.log(error + ': Delete Operation Failed');
            }
        );

        return obs;
    }

}
