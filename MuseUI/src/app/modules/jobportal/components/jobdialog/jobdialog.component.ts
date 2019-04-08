import { Component, OnInit, Inject } from '@angular/core';
import { Job } from '../../models/job';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-jobdialog',
  templateUrl: './jobdialog.component.html',
  styleUrls: ['./jobdialog.component.css']
})
export class JobdialogComponent implements OnInit {

  job: Job;
  status: string;
  actionType: string;

  
  constructor(public snackBar: MatSnackBar, public dialogRef: MatDialogRef<JobdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private jobService: JobService) {
    this.status = data.obj.status;
    this.job = data.obj;
    this.actionType = data.actionType;
  }

  ngOnInit() {
  }

  updateJob(){
    
this.job.status = this.status;
    this.jobService.updateJob(this.job).subscribe((res) => {
      let message = "Job status updated successfully";
      this.snackBar.open(message, '', {
        duration: 1000
      });
    });
    this.dialogRef.close();
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
