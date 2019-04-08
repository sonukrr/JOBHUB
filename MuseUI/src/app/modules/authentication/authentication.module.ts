import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatInputModule, MatCardModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
     MatSelectModule,
      FormsModule,
       RouterModule, 
       MatFormFieldModule,
       MatButtonModule,
       MatSnackBarModule,
       MatFormFieldModule,
       MatInputModule,
       MatCardModule
  ],
  providers:[]
  
})
export class AuthenticationModule { }
