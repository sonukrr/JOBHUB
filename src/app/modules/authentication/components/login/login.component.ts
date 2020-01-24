import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  newUser:User;
  invalid:boolean=false;

  constructor(private authService:AuthenticationService, private router : Router) { 
    this.newUser= new User();
  }

  ngOnInit() {
  }

  loginUser(){
    this.authService.loginUser(this.newUser).subscribe((res)=>{
      if(res.token)
      {
        this.authService.setToken(res.token);
        this.router.navigate(['/jobs/homepage']);
      }
    },(error:HttpErrorResponse)=>{

      if(error instanceof Error)
      {
          console.log("Client side error"+error);
      }
  
      else
      {
        this.invalid=true;
          console.log("server side error"+error);
      }
     
  } );
  }

}
