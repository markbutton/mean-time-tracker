import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { UserComponent } from './user.component';
import { LocationComponent } from './components/location/location.component';
import { LunchComponent } from './components/lunch/lunch.component';
import { TrackerComponent } from './components/tracker/tracker.component';
import { TravelComponent } from './components/travel/travel.component';
import { HomeComponent } from './components/home/home.component';

const userRoutes: Routes = [
    { path: '', component: UserComponent,  
                children: [
                    { path: '', component: HomeComponent, canActivate: [AuthGuard]},
                    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
                    { path: 'location', component: LocationComponent, canActivate: [AuthGuard]},
                    { path: 'lunch', component: LunchComponent, canActivate: [AuthGuard]},
                    { path: 'tracker', component: TrackerComponent, canActivate: [AuthGuard]},
                    { path: 'travel', component: TravelComponent, canActivate: [AuthGuard]}
                ]
    },

    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

export const UserRouter = RouterModule.forChild(userRoutes);
