import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../../models/user';
import { UserStore } from '../../store/user.store';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  currentUser: any;
  private user:Observable<User>;

  constructor(
    private userStore: UserStore,
    private alertService: AlertService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.user = this.userStore.getUserById(this.currentUser._id).share();
  }

}
