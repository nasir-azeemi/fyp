import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService, Job_Posting_Interface } from 'src/app/global-variables.service';
import { RoutingService } from 'src/app/routing.service';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  job_posting_details: Job_Posting_Interface;

  constructor(public global_vars: GlobalVariablesService, private socket_service: SocketService, private routing_service: RoutingService) { }

  ngOnInit(): void {
    console.log(this.global_vars.viewing_job.job);

    this.job_posting_details = {
      idjob_postings: this.global_vars.viewing_job.job["idjob_postings"],
      idemployer: this.global_vars.viewing_job.job["idemployer"],
      Email: this.global_vars.viewing_job.job["Email"],
      Phone: this.global_vars.viewing_job.job["Phone"],
      Location: this.global_vars.viewing_job.job["Location"],
      Job_Title: this.global_vars.viewing_job.job["Job_Title"],
      Job_Type: this.global_vars.viewing_job.job["Job_Type"],
      Job_Category: this.global_vars.viewing_job.job["Job_Category"],
      Industry: this.global_vars.viewing_job.job["Industry"],
      Job_Experience: this.global_vars.viewing_job.job["Job_Experience"],
      Job_Qualification: this.global_vars.viewing_job.job["Job_Qualification"],
      Job_Level: this.global_vars.viewing_job.job["Job_Level"],
      Job_Description: this.global_vars.viewing_job.job["Job_Description"],
      Job_Responsibilities: this.global_vars.viewing_job.job["Job_Responsibilities"],
      Job_Requirements: this.global_vars.viewing_job.job["Job_Requirements"],
      Date_Posted: this.global_vars.viewing_job.job["Date_Posted"],
      Assessments_Required: this.global_vars.viewing_job.job["Assessments_Required"],
      Interview_Required: this.global_vars.viewing_job.job["Interview_Required"],
      Question_1: this.global_vars.viewing_job.job["Question_1"],
      Question_2: this.global_vars.viewing_job.job["Question_2"],
      Question_3: this.global_vars.viewing_job.job["Question_3"],
      Hidden: this.global_vars.viewing_job.job["Hidden"]
    };
    // this.job_posting_details = this.global_vars.viewing_job.job;
  }


  apply_job()
  {
    this.socket_service.apply_job();
  }

  edit_job_posting()
  {
    this.routing_service.job_details_to_edit_job();
  }

  hide_job_posting()
  {
    this.job_posting_details["Hidden"] = "Yes";
    this.socket_service.hide_job(this.job_posting_details);
  }

  unhide_job_posting()
  {
    this.job_posting_details["Hidden"] = "No";
    this.socket_service.hide_job(this.job_posting_details);
  }

  delete_job_posting()
  {
    this.socket_service.delete_job(this.job_posting_details);
  }

  view_candidate_applications()
  {
    this.socket_service.get_candidates_details();
  }

}
