import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';

import { UserState } from '../../models/user-state';
import { UserStateStore } from '../../store/user-state.store';
import { Time } from '../../../models/time';
import { TimeStore } from '../../../store/time.store';
import { Location } from '../../../models/location';
import { LocationStore } from '../../../store/location.store';

import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  providers: [UserStateStore, TimeStore, LocationStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationComponent implements OnInit {
  currentUser: any;
  userState: Observable<UserState>;

  private selectedLocation: Location;
  private time: any = {};
  private location: Location;
  // Data Stream
  private locations: Observable<List<Location>>;

  constructor(    
    private userStateStore: UserStateStore,
    private timeStore: TimeStore,
    private locationStore: LocationStore,
    private alertService: AlertService,
    private ref: ChangeDetectorRef) { 
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));   
    }

  ngOnInit() {
    this.userState = this.userStateStore.getUserStateById(this.currentUser._id).share();
    this.selectedLocation = this.locationStore.getLocation();
    this.locations = this.locationStore.getAllLocations().share();
  }

  ngAfterViewInit(){
    this.getOpenTime();
  }

  // Template Handlers
  punchIn() {
    let n = Date.now();
    let t:Time = new Time();

    t.userId = this.currentUser._id;
    t.locationId = this.selectedLocation._id;
    t.timeIn = n;
    t.timeOut = 0;
    t.timeType = 'location';

    this.createTime(t);
  }

  punchOut() {
    let n = Date.now();
    let t = this.time;
    t.timeOut = n;

    this.updateTime(t);
  }

  changeLocation(location) {
    this.locationStore.setLocation(location);
  }

  // Time functions
  createTime(time) {
    this.timeStore.createTime(time).subscribe(
      data => {
        this.updateUserState(true);
        this.alertService.success('You have punched in.', false);
      },
      error => {
        this.alertService.error(error);
      });
  }

  updateTime(time) {
    this.timeStore.updateTime(time).subscribe(
      data => {
        this.updateUserState(false);
        this.alertService.success('You have punched out.', false);
      },
      error => {
        this.alertService.error(error);
      });
  }

  getOpenTime() {
    this.timeStore.getOpen(this.currentUser._id, 'location').subscribe(
      time => { 
        this.time = time;
      });
  }

  // User Function
  updateUserState(w: boolean) {
    let u: UserState = this.userStateStore.getCurrentUserState();
    u.atwork = w;
    this.userStateStore.updateUserState(u);
    this.ref.detectChanges();
    //this.user = this.userStore.getUserById(this.userId);
/*    this.userStore.updateUser(u).subscribe(
      user => {
        this.user = user;
      });*/
    //this.alertService.success('The User Update Function was called with value: ', false);
  }

  // Location Functions
  getLocationById(locationId) {
    this.locationStore.getLocationById(locationId).subscribe(
      location => { 
        this.location = location;
      });
  }

}
