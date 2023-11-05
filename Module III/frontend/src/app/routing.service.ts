import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router) { }
  
  
  login_to_register()
  {
    this.router.navigate(['register']);
  }

  login_to_employer_register()
  {
    this.router.navigate(['register-employer']);
  }

  register_to_dashboard() 
  {
    this.router.navigate(['dashboard']);
  }

  register_to_employer_dashboard() 
  {
    this.router.navigate(['dashboard-employer']);
  }

  login_to_dashboard()
  {
    this.router.navigate(['dashboard']);
  }

  login_to_employer_dashboard() 
  {
    this.router.navigate(['dashboard-employer']);
  }

  dashboard_to_dashboardupdate() 
  {
    this.router.navigate(['dashboard-update']);
  }

  dashboardupdate_to_dashboard() 
  {
    this.router.navigate(['dashboard']);
  }

  dashboard_to_assessment() 
  {
    this.router.navigate(['assessments']);
  }

  assessment_to_take_assessment()
  {
    this.router.navigate(['take-assessment']);
  }

  job_listing_to_job_details()
  {
    this.router.navigate(['job-details']);
  }

  interview_to_give_interview()
  {
    this.router.navigate(['give-interview']);
  }

  give_interview_to_interview()
  {
    this.router.navigate(['interview']);
  }






  employer_dashboard_to_dashboardupdate() 
  {
    this.router.navigate(['dashboard-employer-update']);
  }

  employer_dashboardupdate_to_dashboard() 
  {
    this.router.navigate(['dashboard-employer']);
  }

  employers_to_employer_details()
  {
    this.router.navigate(['employer-details']);
  }

  dashboard_to_candidates()
  {
    this.router.navigate(['active-job-listings']);
  }

  job_listings_to_active_candidate_applications()
  {
    this.router.navigate(['active-candidate-applications']);
  }

  active_candidate_applications_to_resume()
  {
    this.router.navigate(['resume']);
  }

  job_details_to_edit_job()
  {
    this.router.navigate(['edit-job-posting']);
  }

  active_candidate_applications_to_view_answers()
  {
    this.router.navigate(['view-answers']);
  }
}
