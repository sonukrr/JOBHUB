import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JobService } from '../../services/job.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Job } from '../../models/job';
import { HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { DataServiceService } from 'src/app/data-service.service';

@Component({
  selector: 'app-viewjob',
  templateUrl: './viewjob.component.html',
  styleUrls: ['./viewjob.component.css']
})
export class ViewjobComponent {

  jobId:string;
  res:any;
  job:Job;
  inBookmarks:boolean;
  bookmarkedCount:number;

  @Output()
  addJob = new EventEmitter();

  constructor(private jobService:JobService, private activatedRoute:ActivatedRoute,private snackBar:MatSnackBar,private dataService:DataServiceService) {
    
this.job = new Job();
   }

  ngOnInit() {


    this.activatedRoute.queryParams.subscribe(params => {
      this.jobId = params["jobId"];
      // this.inBookmarks = params["inBookmarks"];
   
    });

    this.jobService.getJobById(this.jobId).subscribe((res)=> {
      this.res = res;
    });

    this.jobService.viewBookmarks().subscribe(res => {
      this.bookmarkedCount = res.length;
    });

    this.dataService.changeCount(this.bookmarkedCount);
    
  }

  check(){
  this.dataService.currentStatus.subscribe(res => this.inBookmarks = res);
    return this.inBookmarks;

  }
  addToBookmark() {
    this.job.jobId=this.res.id;
    this.job.company=this.res.company.name;
    this.job.location=this.res.locations[0].name;
    this.job.publishedDate=this.res.publication_date;

    this.jobService.addToBookmark(this.job).subscribe((res) => {
      let message = "Job successfuly added to bookmark";
      this.snackBar.open(message, '', {
        duration: 1000
      });

      this.bookmarkedCount += 1;
    this.dataService.changeCount(this.bookmarkedCount);

    },(error:HttpErrorResponse)=>{

      if(error instanceof Error)
      {
          console.log("Client side error"+error);
      }
  
      else
      {
        let message = "   Can't save !  Job already exists";
      this.snackBar.open(message, '', {
        duration: 1500
      });
       
          console.log("server side error"+error);
      }
     
  } );
  }

  loadData(){
    if(this.res == null)
      return true;
    else return false;
  }
}
