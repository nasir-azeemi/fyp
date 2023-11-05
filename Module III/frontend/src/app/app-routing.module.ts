import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/pages/about/about.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { CandidatesDetailsComponent } from './components/pages/candidates-details/candidates-details.component';
import { CandidatesComponent } from './components/pages/candidates/candidates.component';
import { ComingSoonComponent } from './components/pages/coming-soon/coming-soon.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { DashboardUpdateComponent } from './components/pages/dashboard-update/dashboard-update.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { EmployersDetailsComponent } from './components/pages/employers-details/employers-details.component';
import { EmployersComponent } from './components/pages/employers/employers.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { FavouriteJobsComponent } from './components/pages/favourite-jobs/favourite-jobs.component';
import { HomeOneComponent } from './components/pages/home-one/home-one.component';
import { HomeThreeComponent } from './components/pages/home-three/home-three.component';
import { HomeTwoComponent } from './components/pages/home-two/home-two.component';
import { JobDetailsComponent } from './components/pages/job-details/job-details.component';
import { JobsComponent } from './components/pages/jobs/jobs.component';
import { LoginComponent } from './components/pages/login/login.component';
import { PostAJobComponent } from './components/pages/post-a-job/post-a-job.component';
import { PricingComponent } from './components/pages/pricing/pricing.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ResumeDetailsComponent } from './components/pages/resume-details/resume-details.component';
import { TermsConditionsComponent } from './components/pages/terms-conditions/terms-conditions.component';
import { TestimonialsComponent } from './components/pages/testimonials/testimonials.component';
import { AssessmentsComponent } from './components/pages/assessments/assessments.component';
import { TakeAssessmentComponent } from './components/pages/take-assessment/take-assessment.component';
import { LiveInterviewComponent } from './components/pages/live-interview/live-interview.component';
import { JobsAppliedComponent } from './components/pages/jobs-applied/jobs-applied.component';

import { RegisterEmployerComponent } from './components/pages/register-employer/register-employer.component';
import { DashboardEmployerComponent } from './components/pages/dashboard-employer/dashboard-employer.component';
import { DashboardEmployerUpdateComponent } from './components/pages/dashboard-employer-update/dashboard-employer-update.component';
import { ActiveJobListingsComponent } from './components/pages/active-job-listings/active-job-listings.component';
import { ActiveCandidateApplicationsComponent } from './components/pages/active-candidate-applications/active-candidate-applications.component';
import { EditJobPostingComponent } from './components/pages/edit-job-posting/edit-job-posting.component';
import { GiveInterviewComponent } from './components/pages/give-interview/give-interview.component';
import { ViewAnswersComponent } from './components/pages/view-answers/view-answers.component';
import { JobResultsComponent } from './components/pages/job-results/job-results.component';


import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'home-two', component: HomeTwoComponent},
    {path: 'home-three', component: HomeThreeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'register-employer', component: RegisterEmployerComponent},
    {path: 'employer-details', component: EmployersDetailsComponent, canActivate: [AuthGuardService]},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
    {path: 'dashboard-employer', component: DashboardEmployerComponent, canActivate: [AuthGuardService]},
    {path: 'dashboard-update', component: DashboardUpdateComponent, canActivate: [AuthGuardService]},
    {path: 'dashboard-employer-update', component: DashboardEmployerUpdateComponent, canActivate: [AuthGuardService]},
    {path: 'edit-job-posting', component: EditJobPostingComponent, canActivate: [AuthGuardService]},
    {path: 'resume', component: ResumeDetailsComponent, canActivate: [AuthGuardService]},
    {path: 'assessments', component: AssessmentsComponent, canActivate: [AuthGuardService]},
    {path: 'take-assessment', component: TakeAssessmentComponent, canActivate: [AuthGuardService]},
    {path: 'interview', component: LiveInterviewComponent, canActivate: [AuthGuardService]},
    {path: 'give-interview', component: GiveInterviewComponent, canActivate: [AuthGuardService]},
    {path: 'view-answers', component: ViewAnswersComponent, canActivate: [AuthGuardService]},
    {path: 'post-a-job', component: PostAJobComponent, canActivate: [AuthGuardService]},
    {path: 'jobs', component: JobsComponent, canActivate: [AuthGuardService]},
    {path: 'job-results', component: JobResultsComponent, canActivate: [AuthGuardService]},
    {path: 'job-details', component: JobDetailsComponent, canActivate: [AuthGuardService]},
    {path: 'employers', component: EmployersComponent, canActivate: [AuthGuardService]},
    {path: 'active-job-listings', component: ActiveJobListingsComponent, canActivate: [AuthGuardService]},
    {path: 'jobs-applied', component: JobsAppliedComponent, canActivate: [AuthGuardService]},
    {path: 'active-candidate-applications', component: ActiveCandidateApplicationsComponent, canActivate: [AuthGuardService]},
    {path: 'testimonials', component: TestimonialsComponent},
    {path: 'pricing', component: PricingComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'coming-soon', component: ComingSoonComponent},
    {path: 'error', component: ErrorComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent},
    {path: 'terms-conditions', component: TermsConditionsComponent},
    {path: 'about', component: AboutComponent},
    {path: 'favourite-jobs', component: FavouriteJobsComponent},
    {path: 'candidates', component: CandidatesComponent},
    {path: 'candidate-details', component: CandidatesDetailsComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'blog-details', component: BlogDetailsComponent},
    {path: 'contact', component: ContactComponent},


    {path: '**', component: ErrorComponent} // This line will remain down from the whole component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}