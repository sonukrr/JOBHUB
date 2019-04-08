import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SearchComponent } from './components/search/search.component';
import { ApicontainerComponent } from './components/apicontainer/apicontainer.component';
import { ContainerComponent } from './components/container/container.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatButtonModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatPaginatorModule, MatDividerModule, MatProgressSpinnerModule, MatProgressBarModule } from '@angular/material';
import { InterceptorService } from './services/interceptor.service';
import { JobdialogComponent } from './components/jobdialog/jobdialog.component';
import { ViewjobComponent } from './components/viewjob/viewjob.component';

@NgModule({
  declarations: [HomepageComponent,
     SearchComponent,
      ApicontainerComponent,
       ContainerComponent,
        ThumbnailComponent,
         BookmarkComponent,
         JobdialogComponent,
         ViewjobComponent,

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatProgressBarModule

  ],
  providers:[
    {provide:HTTP_INTERCEPTORS,
      useClass:InterceptorService,
    multi :true},

  ],

  entryComponents: [JobdialogComponent],
})
export class JobportalModule { }
