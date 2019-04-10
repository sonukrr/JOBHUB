import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job';
import { MatSnackBar } from '@angular/material';
import { DataServiceService } from 'src/app/data-service.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  jobsList:Array<Job>;


  inBookmarks:boolean = true;

  constructor(private jobService:JobService, private snackBar:MatSnackBar) {
    this.jobsList = [];
   }



  ngOnInit() {

    this.jobService.viewBookmarks().subscribe((res) => {

      if(res.length == 0)
      {
        this.snackBar.open("Bookmarks List is currently empty", '', {
          duration: 1000
        });
      }
      else
      this.jobsList.push(...res);
      });

    
  }



}
