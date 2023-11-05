import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService, Job_Posting_Interface } from 'src/app/global-variables.service';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-post-a-job',
  templateUrl: './post-a-job.component.html',
  styleUrls: ['./post-a-job.component.scss']
})
export class PostAJobComponent implements OnInit {

  job_posting_details: Job_Posting_Interface;

  error_show = false;

  constructor(public global_vars: GlobalVariablesService, private socket_service: SocketService) { }

  ngOnInit(): void 
  {
    this.job_posting_details = {
      idjob_postings: -1,
      idemployer: this.global_vars.employer_data.idemployer,
      Email: "",
      Phone: "",
      Location: "",
      Job_Title: "",
      Job_Type: "",
      Job_Category: "",
      Industry: "",
      Job_Experience: "",
      Job_Qualification: "",
      Job_Level: "",
      Job_Description: "",
      Job_Responsibilities: [],
      Job_Requirements: [],
      Date_Posted: "",
      Assessments_Required: [],
      Interview_Required: "",
      Question_1: "",
      Question_2: "",
      Question_3: "",
      Hidden: "No"
    };
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
      this.socket_service.post_job(this.job_posting_details);
    }
  }
}
