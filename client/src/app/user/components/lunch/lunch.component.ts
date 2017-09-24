import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserState } from '../../models/user-state';
import { UserStateStore } from '../../store/user-state.store';
import { Time } from '../../../models/time';
import { TimeStore } from '../../../store/time.store';

import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-lunch',
  templateUrl: './lunch.component.html',
  styleUrls: ['./lunch.component.css'],
  providers: [UserStateStore, TimeStore]
})
export class LunchComponent implements OnInit {
  currentUser: any;
  userState:Observable<UserState>;

  private time: Observable<Time>;

  constructor(
    private userStateStore: UserStateStore,
    private timeStore: TimeStore,
    private alertService: AlertService) { 
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

  ngOnInit() {
    this.userState = this.userStateStore.getUserStateById(this.currentUser._id).share();
  }

  lunchOut() {
    this.alertService.error('You Punched Out for Lunch');
  }

  lunchIn() {
    this.alertService.error('You Punched In from Lunch');
  }

}
