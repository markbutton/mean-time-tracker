import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserStateStore } from '../../store/user-state.store';
import { UserState } from '../../models/user-state';
import { Time } from '../../../models/time';
import { TimeStore } from '../../../store/time.store';

import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css'],
  providers: [UserStateStore, TimeStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TravelComponent implements OnInit {
  currentUser: any;
  userState:Observable<UserState>;

  private currentUserState: any = {};
  private time: any = {};

  private disableStart: boolean = true;
  private disableEnd: boolean = true;
  private disableAll: boolean = false;

  constructor(
    private userStateStore: UserStateStore,
    private timeStore: TimeStore,
    private alertService: AlertService) { 
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

  ngOnInit() {
    this.userState = this.userStateStore.getUserStateById(this.currentUser._id).share();
  }

  ngAfterViewInit(){
    this.setFormState();
    this.getOpenTime();
  }

  // Template Handlers
  startTrip() {
    let n = Date.now();
    let t:Time = new Time();

    t.userId = this.currentUserState._id;
    t.locationId = '5958702de260523d38482f7c';
    t.timeIn = n;
    t.timeOut = 0;
    t.timeType = 'travel';

    this.createTime(t);
    this.alertService.error('You Started Your Trip');
  }

  endTrip() {
    let n = Date.now();
    let t = this.time;
    t.timeOut = n;

    this.updateTime(t);
    this.alertService.error('You Ended Your Trip');
  }

  setFormState() {
    if (!this.currentUserState.atwork) {
      if (!this.currentUserState.driving) {
        this.disableStart = false;
      } else if (this.currentUserState.driving) {
        this.disableEnd = false;
      }
    } else {
      this.disableAll = true;
      this.alertService.error('You must punch out before Traveling.');
    }
  }

  // Time Functions
  getOpenTime() {
    this.timeStore.getOpen(this.currentUserState._id, 'travel').subscribe(
      time => { 
        this.time = time;
      });
  }

  createTime(time) {
    this.timeStore.createTime(time).subscribe(
      data => {
        this.updateUserState(true);
      },
      error => {
        this.alertService.error(error);
      });
  }

  updateTime(time) {
    this.timeStore.updateTime(time).subscribe(
      data => {
        this.updateUserState(false);
      },
      error => {
        this.alertService.error(error);
      });
  }

  // User Function
  updateUserState(w: boolean) {
    let u: any = {};
    u._id = this.currentUserState._id;
    u.driving = w;
    this.userStateStore.updateUserState(u);
  }

}
