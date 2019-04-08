import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser:User;
  invalid:boolean=false;

  constructor(private authService:AuthenticationService , private router:Router) {
    this.newUser = new User();
   }


  ngOnInit() {
  }

  registerUser(){
   this.authService.registerUser(this.newUser).subscribe((res) => {
  
    this.router.navigate(['/login']);
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


  resetInput(){
    this.newUser=null;
  }
}
