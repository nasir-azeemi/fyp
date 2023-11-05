import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/routing.service';
import { SocketService } from 'src/app/socket.service';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private routing_service: RoutingService, private socket_service: SocketService, public global_vars: GlobalVariablesService, private cookie_service: CookieService) { }

  show_input = false;

  logging_as_candidate = false;

  ngOnInit(): void 
  {
    console.log(this.global_vars.user_data);
    if (this.global_vars.user_data_retrieved)
    {
      this.cookie_service.set('email', '');
      this.cookie_service.set('password', '');
      window.location.reload();
    }
    else
    {
      if ( (this.cookie_service.get('email') != "") && (this.cookie_service.get('password') != "") )
      {
        if ((this.cookie_service.get('user_type') == "candidate"))
          this.socket_service.login({"email": this.cookie_service.get('email'), "password": this.cookie_service.get('password')});
        
        else
          this.socket_service.employer_login({"email": this.cookie_service.get('email'), "password": this.cookie_service.get('password')});
      }
    }
  }

  show_candidate_input()
  {
    this.show_input = true;
    this.logging_as_candidate = true;
  }

  show_employer_input()
  {
    this.show_input = true;
  }




  to_register()
  {
    if (this.logging_as_candidate)
      this.routing_service.login_to_register();
    
    else
      this.routing_service.login_to_employer_register();
  }

  login(data)
  {
    this.global_vars.hide_error = true;

    if (this.socket_service.validate_input(data))
    {
      if (this.logging_as_candidate)
        this.socket_service.login(data);
      
      else
        this.socket_service.employer_login(data);
    }
    else
    {
      this.global_vars.error = "* Required fields cannot be empty.";
      this.global_vars.hide_error = false;
    }
  }


}
