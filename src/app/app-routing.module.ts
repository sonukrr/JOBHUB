import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRouterModule } from './modules/authentication/authentication-routing.module';
import { JobRouterModule } from './modules/jobportal/job-routing.module';

const appRoutes: Routes = [
  {path:'',
  redirectTo:'login',
  pathMatch: 'full'  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes), AuthRouterModule,JobRouterModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
