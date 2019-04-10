import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JobService } from './modules/jobportal/services/job.service';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  //for bookmark count 
  private count:number;
  
  private messageSource = new BehaviorSubject(this.count);
  currentCount = this.messageSource.asObservable();

  changeCount(count: number) {
    if(count!=undefined)
    this.messageSource.next(count);
  }

  //for bookmarks status 
  private messageSource1 = new BehaviorSubject(false);
  currentStatus = this.messageSource1.asObservable();

  changeStatus(inBookmarks:boolean){
    this.messageSource1.next(inBookmarks);
  }
}
