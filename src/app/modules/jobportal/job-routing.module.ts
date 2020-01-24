import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SearchComponent } from './components/search/search.component';
import { ApicontainerComponent } from './components/apicontainer/apicontainer.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { ViewjobComponent } from './components/viewjob/viewjob.component';

const jobRoutes: Routes = [
    {
        path: 'jobs',
        children: [
            {
                path: '',
                redirectTo: '/jobs/homepage',
                pathMatch: 'full',
                canActivate: [AuthGuard]
            },
            {
                path: 'homepage',
                component: HomepageComponent,
                canActivate: [AuthGuard],
                data: {
                    jobType: "all"
                }
            },
            {
                path: 'bookmark',
                component: BookmarkComponent,
                canActivate: [AuthGuard],
                data: {
                    jobType: "all"
                }
            },
          
            {
                path: 'search',
                component: SearchComponent,
                canActivate: [AuthGuard]

            },
            {
                path: 'viewJob',
                component: ViewjobComponent,
                canActivate: [AuthGuard]

            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(jobRoutes)],
    exports: [RouterModule]
})
export class JobRouterModule { }
