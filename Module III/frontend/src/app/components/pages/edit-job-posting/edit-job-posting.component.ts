import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService, Job_Posting_Interface } from 'src/app/global-variables.service';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-edit-job-posting',
  templateUrl: './edit-job-posting.component.html',
  styleUrls: ['./edit-job-posting.component.scss']
})
export class EditJobPostingComponent implements OnInit {

  job_posting_details: Job_Posting_Interface;

  error_show = false;

  constructor(public global_vars: GlobalVariablesService, private socket_service: SocketService) { }

  ngOnInit(): void 
  {
    this.job_posting_details = {
      idjob_postings: this.global_vars.viewing_job.job["idjob_postings"],
      idemployer: this.global_vars.employer_data.idemployer,
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

    (<HTMLInputElement>document.getElementById("job_type")).value = this.job_posting_details.Job_Type.toString();
    (<HTMLInputElement>document.getElementById("job_experience")).value = this.job_posting_details.Job_Experience.toString();
    (<HTMLInputElement>document.getElementById("job_qualification")).value = this.job_posting_details.Job_Qualification.toString();
    (<HTMLInputElement>document.getElementById("interview_required")).value = this.job_posting_details.Interview_Required.toString();
  }

  add_job_res()
  {
    this.job_posting_details.Job_Responsibilities.push("");
  }

  add_job_req()
  {
    this.job_posting_details.Job_Requirements.push("");
  }
  
  add_assessment_required()
  {
    this.job_posting_details.Assessments_Required.push("-1");
  }


  remove_job_res(index)
  {
    this.job_posting_details.Job_Responsibilities.splice(index,1);
  }

  remove_job_req(index)
  {
    this.job_posting_details.Job_Requirements.splice(index,1);
  }

  remove_assessment_required(index)
  {
    this.job_posting_details.Assessments_Required.splice(index,1);
  }

  trackByFn(index, treatment) 
  {
    return index;
  }

  check_required_variables()
  {
    if (this.job_posting_details.Email == "" || this.job_posting_details.Phone == "" || this.job_posting_details.Location == "" || this.job_posting_details.Job_Title == "")
    {
      this.error_show = true;
      return false;
    }

    return true;
  }

  fetch_selected_values()
  {
    this.job_posting_details.Job_Type = (<HTMLInputElement>document.getElementById("job_type")).value;
    this.job_posting_details.Job_Experience = (<HTMLInputElement>document.getElementById("job_experience")).value;
    this.job_posting_details.Job_Qualification = (<HTMLInputElement>document.getElementById("job_qualification")).value;
    this.job_posting_details.Interview_Required = (<HTMLInputElement>document.getElementById("interview_required")).value;
  }

  post_job()
  {
    // console.log(this.job_posting_details);
    this.error_show = false;
    
    if (this.check_required_variables())
    {
      this.fetch_selected_values();
      // console.log(this.job_posting_details);
      this.socket_service.edit_job(this.job_posting_details);
    }
  }
}
