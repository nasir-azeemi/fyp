import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { RoutingService } from 'src/app/routing.service';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.scss']
})
export class AssessmentsComponent implements OnInit {

  constructor(private routing_service: RoutingService, private socket_service: SocketService, public global_vars: GlobalVariablesService) { }

  ngOnInit(): void 
  {
    this.socket_service.get_assessment_names();
  }

  to_take_assessment(assessment_id)
  {
    this.socket_service.get_assessment_questions(assessment_id);
    this.routing_service.assessment_to_take_assessment();
  }

}
