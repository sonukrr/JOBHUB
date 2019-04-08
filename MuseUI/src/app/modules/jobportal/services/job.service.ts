import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job';
import { retry, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class JobService {

  apiEndpoint:string;
  authEndpoint:string;
  museEndpoint:string;


  constructor(private http: HttpClient) {
    this.apiEndpoint = "https://www.themuse.com/api/public/jobs?";
  
     this.museEndpoint = "http://localhost:8000/api/v1/jobservice/job";
   
  }

  getAlljobs(page:number):Observable<Array<Job>>{
    const url = `${this.apiEndpoint}page=${page}`;
    return this.http.get(url).pipe(
      retry(3),
      map(this.pickJobResults), map(this.transformPosterPath.bind(this))
    );
  }

  searchJobs(searchKey:string, page:number):any{
    const url = `${this.apiEndpoint}category=${searchKey}&page=${page}`;
    return this.http.get(url).pipe(
      retry(3),
      map(this.pickJobResults), map(this.transformPosterPath.bind(this))
    );

  }

  addToBookmark(job:Job):any{
    const url = `${this.museEndpoint}`;
    return this.http.post(url, job);
  }

  viewBookmarks():any{
    const url = `${this.museEndpoint}/fetchalljobs`;
    return this.http.get(url );
  }

  deleteJob(jobId:string):any{
    const url = `${this.museEndpoint}/${jobId}`;
    return this.http.delete(url );
  }

  updateJob(job:Job):any{
    const url = `${this.museEndpoint}`;
    return this.http.put(url,job );
  }

  getJobById(jobId:string):any{
    const url = `https://www.themuse.com/api/public/jobs/${jobId}`
    return this.http.get(url);
  }

  pickJobResults(res){
    return res.results;
  }

  transformPosterPath(res):Array<Job>{

    return res.map(jobRes => {
      let job:Job = new Job();
      job.jobId = jobRes.id;
      job.name = jobRes.name;
      job.publishedDate = jobRes.publication_date;
      if( jobRes.locations[0] === undefined)
      {
        job.location = "Not provided"
      }else
      job.location = jobRes.locations[0].name;
      job.company  = jobRes.company.name;
      
      return job;
    });
  }
}
