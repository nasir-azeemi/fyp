import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { RoutingService } from 'src/app/routing.service';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-active-job-listings',
  templateUrl: './active-job-listings.component.html',
  styleUrls: ['./active-job-listings.component.scss']
})
export class ActiveJobListingsComponent implements OnInit {

  constructor(private socket_service: SocketService, public global_vars: GlobalVariablesService, private routing_service: RoutingService) { }

  ngOnInit(): void 
  {
    this.socket_service.get_self_jobs();
  }


  view_job_details(job)
  {
    if (this.global_vars.viewing_candidates == true)
    {
      this.global_vars.viewing_job.job = job;
      this.socket_service.get_candidates_details();
    }
    else
    {
      // console.log(job);
      this.global_vars.viewing_job.job = job;
      
      this.global_vars.viewing_job.job["Job_Responsibilities"] = this.global_vars.viewing_job.job["Job_Responsibilities"].split("\n");
      this.global_vars.viewing_job.job["Job_Requirements"] = this.global_vars.viewing_job.job["Job_Requirements"].split("\n");
  
      this.socket_service.get_organization_details();
      this.socket_service.get_required_assessment_names();
    }
  }
}
