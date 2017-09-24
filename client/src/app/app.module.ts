import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AlertComponent } from './components/alert/alert.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
//import { LocationComponent } from './components/location/location.component';
//import { TravelComponent } from './components/travel/travel.component';
//import { LunchComponent } from './components/lunch/lunch.component';
//import { TrackerComponent } from './components/tracker/tracker.component';

import { AppRouter } from './app.router';
import { AuthGuard } from './guards/auth.guard';
import { NavGuard } from './guards/nav.guard';
import { customHttpProvider } from './helpers/custom-http';

import { AlertService } from './services/alert.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { LocationService } from './services/location.service';
import { TimeService } from './services/time.service';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    AppRouter,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    HttpModule
  ],
  providers: [
    customHttpProvider,
    AuthGuard,
    AlertService,
    AuthenticationService,
    LocationService,
    NavGuard,
    TimeService,
    UserService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
