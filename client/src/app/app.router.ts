import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    {
        path: 'admin',
        loadChildren: 'app/admin/admin.module#AdminModule',
        canLoad: [AuthGuard]
    },
    {
        path: 'manager',
        loadChildren: 'app/manager/manager.module#ManagerModule',
        canLoad: [AuthGuard]
    },
    {
        path: 'user',
        loadChildren: 'app/user/user.module#UserModule',
        canLoad: [AuthGuard]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const AppRouter = RouterModule.forRoot(routes);
