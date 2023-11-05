import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-job-results',
  templateUrl: './job-results.component.html',
  styleUrls: ['./job-results.component.scss']
})
export class JobResultsComponent implements OnInit {

  constructor(private socket_service: SocketService, public global_vars: GlobalVariablesService) { }

  ngOnInit(): void 
  {
    this.socket_service.get_job_results();
  }


  check_if_applied()
  {
    this.global_vars.viewing_job["applied"] = true;
  }

  view_job_details(job)
  {
    // console.log(job);
    this.global_vars.viewing_job.job = JSON.parse(JSON.stringify(job));
    
    console.log(job, this.global_vars.viewing_job);

    this.global_vars.viewing_job.job["Job_Responsibilities"] = this.global_vars.viewing_job.job["Job_Responsibilities"].split("\n");
    this.global_vars.viewing_job.job["Job_Requirements"] = this.global_vars.viewing_job.job["Job_Requirements"].split("\n");

    this.check_if_applied();
    this.socket_service.get_organization_details();
    this.socket_service.get_required_assessment_names();
  }
}
