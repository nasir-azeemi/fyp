import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { RoutingService } from 'src/app/routing.service';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-active-candidate-applications',
  templateUrl: './active-candidate-applications.component.html',
  styleUrls: ['./active-candidate-applications.component.scss']
})
export class ActiveCandidateApplicationsComponent implements OnInit {

  constructor(public global_vars: GlobalVariablesService, private routing_service: RoutingService, private socket_service: SocketService) 
  {
    // for(let i = 0; i < 10; i++)
      // this.global_vars.candidate_applications['job_applications'].push(this.global_vars.candidate_applications['job_applications'][0]);
  }

  ngOnInit(): void {
  }

  view_candidate_resume(index)
  {
    // this.global_vars.user_data = this.global_vars.candidate_applications["job_applications"][index];
    this.global_vars.user_data = index;
    this.socket_service.get_candidate_resume({type: "one", reply_emit:"one"});
    // this.routing_service.active_candidate_applications_to_resume();
  }


  // Reject
  swipe_left(i)
  {
    // console.log(this.global_vars.viewing_job);
    this.socket_service.reject_candidate(this.global_vars.candidate_applications["job_applications"][i]["iduser_candidate"], this.global_vars.viewing_job["job"]["idjob_postings"]);
    this.global_vars.candidate_applications["job_applications"].splice(i, 1);
  }

  // Accept
  swipe_right(i)
  {
    // console.log(i);
    this.socket_service.accept_candidate(this.global_vars.candidate_applications["job_applications"][i]["iduser_candidate"], this.global_vars.viewing_job["job"]["idjob_postings"]);

    this.global_vars.candidate_applications['interviews_schedule'].push(this.global_vars.candidate_applications["job_applications"][i]);

    this.global_vars.candidate_applications["job_applications"].splice(i, 1);
  }

  view_answers(candidate)
  {
    this.socket_service.get_videos(candidate["iduser_candidate"], this.global_vars.viewing_job["job"]["idjob_postings"]);
  }

  swipe_right_final(i)
  {
    this.socket_service.accept_candidate_answers(this.global_vars.candidate_applications["interviews_complete"][i]["iduser_candidate"], this.global_vars.viewing_job["job"]["idjob_postings"]);

    this.global_vars.candidate_applications["interviews_complete"].splice(i, 1);
  }

  swipe_left_final(i)
  {
    this.socket_service.reject_candidate_answers(this.global_vars.candidate_applications["interviews_complete"][i]["iduser_candidate"], this.global_vars.viewing_job["job"]["idjob_postings"]);

    this.global_vars.candidate_applications["interviews_complete"].splice(i, 1);
  }
}
