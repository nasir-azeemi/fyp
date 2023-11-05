import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { RoutingService } from 'src/app/routing.service';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-dashboard-employer',
  templateUrl: './dashboard-employer.component.html',
  styleUrls: ['./dashboard-employer.component.scss']
})
export class DashboardEmployerComponent implements OnInit {

  constructor(private routing_service: RoutingService, private socket_service: SocketService, public global_vars: GlobalVariablesService) { }

  ngOnInit(): void {
    this.global_vars.viewing_candidates = false;
  }

  to_dashboard_update()
  {
    this.routing_service.employer_dashboard_to_dashboardupdate();
  }

  view_company_page()
  {
    this.global_vars.viewing_organization = this.global_vars.employer_data;

    this.routing_service.employers_to_employer_details();
  }

  view_candidates()
  {
    this.global_vars.viewing_candidates = true;
    this.routing_service.dashboard_to_candidates();
  }
}
