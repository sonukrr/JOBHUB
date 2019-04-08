import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './modules/authentication/services/authentication.service';
import { LoginComponent } from './modules/authentication/components/login/login.component';
import { JobService } from './modules/jobportal/services/job.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MuseUI';
  userId:string;
  count:number;

  constructor(private router:Router,private authService:AuthenticationService,private jobService:JobService){
  this.count=0;
  };


  ngOnInit(){
  
  }

  checkLoggedIn(){
    this.userId=localStorage.getItem("user");
    if(this.authService.getToken()==null)
    return false;
    else return true;
  }
  
  logOut() {
    this.authService.deleteToken();
    this.router.navigate(['/login']);
  }

  refreshCount(){

    this.jobService.viewBookmarks().subscribe(res=>{
      this.count=res.length;
    });
return true;
  }
}
