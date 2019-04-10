import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './modules/authentication/services/authentication.service';
import { LoginComponent } from './modules/authentication/components/login/login.component';
import { JobService } from './modules/jobportal/services/job.service';
import { count } from 'rxjs/operators';
import { ContainerComponent } from './modules/jobportal/components/container/container.component';
import { DataServiceService } from './data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
 
  @ViewChild(ContainerComponent) containerComponent;

  title = 'MuseUI';
  userId:string;
  count:number;

  

  constructor(private router:Router,private authService:AuthenticationService,private jobService:JobService,private dataService:DataServiceService,private cdr: ChangeDetectorRef){
 
  };


  ngOnInit(){
   
  }

  updateCount(){
    this.dataService.currentCount.subscribe(res => {
      this.count = res;
    });
    return true;
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


}
