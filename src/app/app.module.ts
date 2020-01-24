import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatToolbarModule, MatDialogModule, MatInputModule, MatIconModule, MatBadgeModule} from '@angular/material';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { JobportalModule } from './modules/jobportal/jobportal.module';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './modules/authentication/services/authentication.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoginComponent } from './modules/authentication/components/login/login.component';
import { ContainerComponent } from './modules/jobportal/components/container/container.component';


@NgModule({
  declarations: [
    AppComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    AuthenticationModule,
    JobportalModule,
  
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    HttpClientModule,
    MatIconModule,
    MatBadgeModule
    
    
  ],
  providers: [LoginComponent,ContainerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
