import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from '../../services/authentication.service';
import { AlertService } from '../../services/alert.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UserStore } from '../../store/user.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  private model: any = {};
  private loading = false;
  private returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userStore: UserStore,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.userStore.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          //this.getCurrentUser();
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

/*  getCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userStore.getUserById(this.currentUser._id).subscribe(
      user => {
        this.user = user;
        //this.userId = user._id;
        this.userStore.setCurrentUser(this.user);
      },
      error => {
        this.alertService.error(error);
      }
    );
  }*/

}
