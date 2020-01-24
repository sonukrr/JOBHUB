import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  jobsList:Array<Job>;
  page:number;
  searchKey:string;

  constructor(private jobService:JobService , private snackBar:MatSnackBar) { 
    this.jobsList = [];
    this.page = 1;
  }


  myControl = new FormControl();
  options: string[] = ['Account Management', 'Creative & Design', 'Data Science','Education','Finance','Healthcare & Medicine',
                    'Legal','Operations','Retail','Social Media & Community','Business & Strategy','Customer Service',
                    'Editorial','Engineering','Fundraising & Development','HR & Recruiting','Marketing & PR','Project & Product Management','Sales'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onEnter(searchKey) {
    this.jobsList=[];
    this.searchKey = searchKey;

    this.jobService.searchJobs(searchKey,this.page).subscribe((res) => {
  
      this.jobsList.push(...res);
    });

  }

  updatePageNumber(page:number){
    this.page = page+1;
    this.onEnter(this.searchKey);
    
  }
}
