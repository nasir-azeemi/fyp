import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { RoutingService } from 'src/app/routing.service';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-dashboard-employer-update',
  templateUrl: './dashboard-employer-update.component.html',
  styleUrls: ['./dashboard-employer-update.component.scss']
})
export class DashboardEmployerUpdateComponent implements OnInit {

  constructor(private routing_service: RoutingService, private socket_service: SocketService, public global_vars: GlobalVariablesService) { }

  ngOnInit(): void {
  }

  to_dashboard()
  {    
    this.global_vars.updated_employer_data_backend = false;

    this.socket_service.update_employer_data_and_go_dashboard();
  }

  view_company_page()
  {
    this.global_vars.viewing_organization = this.global_vars.employer_data;

    this.routing_service.employers_to_employer_details();
  }



  imageSrc: string = '';

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    this.global_vars.employer_avatar = this.imageSrc;
    this.socket_service.employer_update_avatar();
    // console.log(this.imageSrc)
  }
}
