import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { RoutingService } from 'src/app/routing.service';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-employers',
  templateUrl: './employers.component.html',
  styleUrls: ['./employers.component.scss']
})
export class EmployersComponent implements OnInit {

  companyFilter:string = "";

  constructor(private socket_service: SocketService, public global_vars: GlobalVariablesService, private routing_service: RoutingService) { }

  ngOnInit(): void 
  {
    this.companyFilter = "";
    this.socket_service.get_employers();
  }

  view_employer_details(employer)
  {
    this.global_vars.viewing_organization = employer;

    this.routing_service.employers_to_employer_details();
  }

}
