import { Component, OnInit } from '@angular/core';

import { GlobalVariablesService } from 'src/app/global-variables.service';
import { RoutingService } from 'src/app/routing.service';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-jobs-applied',
  templateUrl: './jobs-applied.component.html',
  styleUrls: ['./jobs-applied.component.scss']
})
export class JobsAppliedComponent implements OnInit {

  constructor(private socket_service: SocketService, public global_vars: GlobalVariablesService, private routing_service: RoutingService) { }

  ngOnInit(): void 
  {
  }

  check_if_applied()
  {
    this.global_vars.viewing_job["applied"] = false;
    for (let i of this.global_vars.job_applications)
    {
      if (i["idjob_postings"] == this.global_vars.viewing_job.job["idjob_postings"])
      {
        this.global_vars.viewing_job["applied"] = true;
        return;
      }
    }
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
