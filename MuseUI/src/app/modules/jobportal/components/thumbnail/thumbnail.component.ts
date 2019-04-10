import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Job } from '../../models/job';
import { JobdialogComponent } from '../jobdialog/jobdialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { DataServiceService } from 'src/app/data-service.service';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent implements OnInit {

  @Input()
  job:Job;

  @Output()
  addJob = new EventEmitter();


  @Output()
  deleteJob = new EventEmitter();


  @Output()
  updateJob = new EventEmitter();

  @Input()
  inBookmarks:boolean;

  constructor(private snackBar: MatSnackBar, private http: HttpClientModule, private dialog: MatDialog, private route:Router,private dataService:DataServiceService) { }

  ngOnInit() {
    this.dataService.changeStatus(this.inBookmarks);
  }

  addToBookmark(){
    this.addJob.emit(this.job);
  }

  deleteFromBookmark(){
    this.deleteJob.emit(this.job);
  }

  updateJobStatus(actionType){
    let dialogRef = this.dialog.open(JobdialogComponent, {

      width: '400px',
      data: { obj: this.job, actionType: actionType }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog was closed");
    });


  }
  
  viewDetails(){
    if(this.inBookmarks === undefined)
    {
      this.inBookmarks = false;
    }

    let navigationExtras: NavigationExtras = {
      queryParams: {
          "jobId": this.job.jobId,
          "inBookmarks": this.inBookmarks
      }
  };
    
    this.route.navigate(['/jobs/viewJob'], navigationExtras);
    

  }
}
