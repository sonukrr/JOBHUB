import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Job } from '../../models/job';
import { JobService } from '../../services/job.service';
import { MatSnackBar, PageEvent } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { DataServiceService } from 'src/app/data-service.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {


  pageEvent:PageEvent;
  bookmarkedCount:number;

  @Output()
  pageNumber = new EventEmitter();
  @Input()
  jobsList: Array<Job>;

  @Input()
  inBookmarks: boolean;

  job: Job;

  progresValue:number;

  constructor(private jobService: JobService, private snackBar: MatSnackBar,private dataService:DataServiceService) {
    this.job = new Job();
    this.progresValue =0;
  }

  ngOnInit() {
    this.jobService.viewBookmarks().subscribe(res => {
      this.bookmarkedCount = res.length;
    });

    this.dataService.changeCount(this.bookmarkedCount);
    
  }

  addToBookmark(job: Job) {
    
    this.jobService.addToBookmark(job).subscribe((res) => {
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

  deleteFromBookmark(job) {
    
 
    this.jobService.deleteJob(job.jobId).subscribe((res) => {

      if(this.bookmarkedCount > 0)
        this.bookmarkedCount -= 1;
        this.dataService.changeCount(this.bookmarkedCount);

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

  //for progress bar 
@HostListener("window:scroll", [])
onWindowScroll() {
 var element = document.documentElement, 
 body = document.body,
 scrollTop = 'scrollTop',
 scrollHeight = 'scrollHeight';
 this.progresValue = 
 (element[scrollTop]||body[scrollTop]) / 
 ((element[scrollHeight]||body[scrollHeight]) - element.clientHeight) * 100;
}


}
