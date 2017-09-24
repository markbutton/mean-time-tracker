import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';

import { UserComponent } from './user.component';
import { HomeComponent } from './components/home/home.component';
import { LocationComponent } from './components/location/location.component';
import { TravelComponent } from './components/travel/travel.component';
import { LunchComponent } from './components/lunch/lunch.component';
import { TrackerComponent } from './components/tracker/tracker.component';

import { UserRouter } from './user.router';
import { AuthGuard } from '../guards/auth.guard';
import { NavGuard } from '../guards/nav.guard';
import { customHttpProvider } from '../helpers/custom-http';

import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';
import { LocationService } from '../services/location.service';
import { TimeService } from '../services/time.service';
import { UserStateService } from './services/user-state.service';
import { UserStateStore } from './store/user-state.store';


@NgModule({
  declarations: [
    UserComponent,
    LocationComponent,
    TravelComponent,
    LunchComponent,
    TrackerComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    UserRouter,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    HttpModule
  ],
  providers: [
    customHttpProvider,
    AuthGuard,
    AlertService,
    LocationService,
    NavGuard,
    TimeService,
    UserStateStore,
    UserStateService,
    UserService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  //bootstrap: [UserComponent]
})
export class UserModule { }
