import {Component, OnInit} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { RoutingService } from 'src/app/routing.service';
import { SocketService } from 'src/app/socket.service';
import { GlobalVariablesService } from 'src/app/global-variables.service';



@Component({
  selector: 'app-live-interview',
  templateUrl: './live-interview.component.html',
  styleUrls: ['./live-interview.component.scss']
})
export class LiveInterviewComponent implements OnInit {

  constructor(private routing_service: RoutingService, private socket_service: SocketService, public global_vars: GlobalVariablesService) { }

  ngOnInit(): void 
  {
    this.socket_service.get_interviews_scheduled();
  }

  start_interview(interview)
  {
    console.log(interview);

    this.global_vars.giving_interview = interview;

    this.routing_service.interview_to_give_interview();
  }
}