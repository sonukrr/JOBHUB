import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job';

@Component({
  selector: 'app-apicontainer',
  templateUrl: './apicontainer.component.html',
  styleUrls: ['./apicontainer.component.css']
})
export class ApicontainerComponent implements OnInit {

  jobType: string;
  page:number;
  jobsList:Array<Job>;
  pageNumber:number;

  constructor(private route :Router, private jobService:JobService) { 
    this.page = 1;
    this.jobsList = [];
  }

  ngOnInit() {
    this.jobsList=[];
    this.jobService.getAlljobs(this.page).subscribe((res) =>{
      console.log(res);
      this.jobsList.push(...res);
      console.log(this.jobsList);
    });


  }

  pageNumberChanges(number){

    this.page=number+1;
    this.ngOnInit();
  }

}
