import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Job } from '../../models/job';
import { JobService } from '../../services/job.service';
import { MatSnackBar, PageEvent } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {


  pageEvent:PageEvent;
 

  @Output()
  pageNumber = new EventEmitter();
  @Input()
  jobsList: Array<Job>;

  @Input()
  inBookmarks: boolean;

  job: Job;

  constructor(private jobService: JobService, private snackBar: MatSnackBar) {
    this.job = new Job();
  }

  ngOnInit() {

  }

  addToBookmark(job: Job) {
    this.jobService.addToBookmark(job).subscribe((res) => {
      let message = "Job successfuly added to bookmark";
      this.snackBar.open(message, '', {
        duration: 1000
      });
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

  deleteFromBookmark(job) {

    this.jobService.deleteJob(job.jobId).subscribe((res) => {


      this.jobsList.forEach((element, index) => {
        if (element.jobId == job.jobId) {
          this.jobsList.splice(index, 1);
        }

        let message = "Job deleted from bookmark";
        this.snackBar.open(message, '', {
          duration: 1000
        });
      });
    });
  }

 
  updatePage(){

    this.pageNumber.emit(this.pageEvent.pageIndex);
  }

}
