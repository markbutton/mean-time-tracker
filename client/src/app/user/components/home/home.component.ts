import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { UserStateStore } from '../../store/user-state.store';
import { UserState } from '../../models/user-state';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserStateStore, AlertService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  currentUser: any;
  userState:Observable<UserState>;

  constructor(private userStateStore: UserStateStore, private alertService: AlertService) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.userState = this.userStateStore.getUserStateById(this.currentUser._id).share();
  }

}
