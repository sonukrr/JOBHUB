import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const userRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: '/login',
                pathMatch: 'full'
            },
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'register',
                component: RegisterComponent,
            
            },
    
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule]
})
export class AuthRouterModule { }