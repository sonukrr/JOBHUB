import { Component, OnInit, Input } from '@angular/core';
import { JobService } from '../../services/job.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Job } from '../../models/job';
import { HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-viewjob',
  templateUrl: './viewjob.component.html',
  styleUrls: ['./viewjob.component.css']
})
export class ViewjobComponent implements OnInit {

  jobId:string;
  res:any;
  job:Job;
  inBookmarks:boolean=false;

  constructor(private jobService:JobService, private activatedRoute:ActivatedRoute,private snackBar:MatSnackBar) {
    
this.job = new Job();
   }

  ngOnInit() {

    this.inBookmarks=null;
    this.activatedRoute.queryParams.subscribe(params => {
      this.jobId = params["jobId"];
      this.inBookmarks = params["inBookmarks"];
   
    });

    this.jobService.getJobById(this.jobId).subscribe((res)=> {
      this.res = res;
    });

   
  }

  // check(){
  
  //   if(this.inBookmarks)
  //   return true;
  //   else return false;

  // }
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
    });
  }

  // deleteFromBookmark(job) {

  //   this.jobService.deleteJob(job.jobId).subscribe((res) => {


  //     this.jobsList.forEach((element, index) => {
  //       if (element.jobId == job.jobId) {
  //         this.jobsList.splice(index, 1);
  //       }

  //       let message = "Job deleted from bookmark";
  //       this.snackBar.open(message, '', {
  //         duration: 1000
  //       });
  //     });
  //   });
  // }

  loadData(){
    if(this.res == null)
      return true;
    else return false;
  }
}
