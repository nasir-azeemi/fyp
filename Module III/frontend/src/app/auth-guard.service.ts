import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariablesService } from './global-variables.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private global_vars: GlobalVariablesService, private router: Router) { }

  canActivate()
  {
    if (!this.global_vars.user_data_retrieved)
    {
      this.router.navigate(['login']);
      return false;
    }
    else
      return true;
  }
}
