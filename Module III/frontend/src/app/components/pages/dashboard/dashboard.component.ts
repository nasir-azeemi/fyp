import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { RoutingService } from 'src/app/routing.service';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private routing_service: RoutingService, private socket_service: SocketService, public global_vars: GlobalVariablesService) {}

  ngOnInit(): void 
  {
    // console.log(this.global_vars.work_experience);
    this.socket_service.dashboard_info();
  }

  get_user_info()
  {
    this.socket_service.dashboard_info();
  }

  to_dashboard_update()
  {
    this.routing_service.dashboard_to_dashboardupdate();
  }

  to_assessments()
  {
    this.routing_service.dashboard_to_assessment();
  }

}
