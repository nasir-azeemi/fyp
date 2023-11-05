import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeOneComponent } from './components/pages/home-one/home-one.component';
import { HomeTwoComponent } from './components/pages/home-two/home-two.component';
import { HomeThreeComponent } from './components/pages/home-three/home-three.component';
import { PreloaderComponent } from './components/common/preloader/preloader.component';
import { NavbarStyleOneComponent } from './components/common/navbar-style-one/navbar-style-one.component';
import { FooterStyleOneComponent } from './components/common/footer-style-one/footer-style-one.component';
import { NavbarStyleTwoComponent } from './components/common/navbar-style-two/navbar-style-two.component';
import { NavbarStyleThreeComponent } from './components/common/navbar-style-three/navbar-style-three.component';
import { FooterStyleTwoComponent } from './components/common/footer-style-two/footer-style-two.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { EmployersComponent } from './components/pages/employers/employers.component';
import { EmployersDetailsComponent } from './components/pages/employers-details/employers-details.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { ResumeDetailsComponent } from './components/pages/resume-details/resume-details.component';
import { TestimonialsComponent } from './components/pages/testimonials/testimonials.component';
import { PricingComponent } from './components/pages/pricing/pricing.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { ComingSoonComponent } from './components/pages/coming-soon/coming-soon.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './components/pages/terms-conditions/terms-conditions.component';
import { AboutComponent } from './components/pages/about/about.component';
import { JobsComponent } from './components/pages/jobs/jobs.component';
import { FavouriteJobsComponent } from './components/pages/favourite-jobs/favourite-jobs.component';
import { JobDetailsComponent } from './components/pages/job-details/job-details.component';
import { PostAJobComponent } from './components/pages/post-a-job/post-a-job.component';
import { CandidatesComponent } from './components/pages/candidates/candidates.component';
import { CandidatesDetailsComponent } from './components/pages/candidates-details/candidates-details.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { DashboardUpdateComponent } from './components/pages/dashboard-update/dashboard-update.component';
import { AssessmentsComponent } from './components/pages/assessments/assessments.component';
import { TakeAssessmentComponent } from './components/pages/take-assessment/take-assessment.component';
import { LiveInterviewComponent } from './components/pages/live-interview/live-interview.component';

import { SocketIoModule, SocketIoConfig, Socket } from 'ngx-socket-io';

import { WebcamModule } from 'ngx-webcam';
import { RegisterEmployerComponent } from './components/pages/register-employer/register-employer.component';
import { DashboardEmployerComponent } from './components/pages/dashboard-employer/dashboard-employer.component';
import { DashboardEmployerUpdateComponent } from './components/pages/dashboard-employer-update/dashboard-employer-update.component';
import { ActiveJobListingsComponent } from './components/pages/active-job-listings/active-job-listings.component';
import { JobsAppliedComponent } from './components/pages/jobs-applied/jobs-applied.component';
import { ActiveCandidateApplicationsComponent } from './components/pages/active-candidate-applications/active-candidate-applications.component';
import { EditJobPostingComponent } from './components/pages/edit-job-posting/edit-job-posting.component';
import { GiveInterviewComponent } from './components/pages/give-interview/give-interview.component';
import { VideoRecordingService } from './components/pages/give-interview/video-recording.service';
import { AudioRecordingService } from './components/pages/give-interview/audio-recording.service';
import { ViewAnswersComponent } from './components/pages/view-answers/view-answers.component';
import { JobResultsComponent } from './components/pages/job-results/job-results.component';


const config: SocketIoConfig = {
	url: environment.baseRoute, // socket server url;
	options: {
		transports: ['websocket']
	}
}


@NgModule({
  declarations: [
    AppComponent,
    HomeOneComponent,
    HomeTwoComponent,
    HomeThreeComponent,
    PreloaderComponent,
    NavbarStyleOneComponent,
    FooterStyleOneComponent,
    NavbarStyleTwoComponent,
    NavbarStyleThreeComponent,
    FooterStyleTwoComponent,
    LoginComponent,
    RegisterComponent,
    EmployersComponent,
    EmployersDetailsComponent,
    DashboardComponent,
    ResumeDetailsComponent,
    TestimonialsComponent,
    PricingComponent,
    FaqComponent,
    ComingSoonComponent,
    ErrorComponent,
    PrivacyPolicyComponent,
    TermsConditionsComponent,
    AboutComponent,
    JobsComponent,
    FavouriteJobsComponent,
    JobDetailsComponent,
    PostAJobComponent,
    CandidatesComponent,
    CandidatesDetailsComponent,
    BlogDetailsComponent,
    BlogComponent,
    ContactComponent,
    DashboardUpdateComponent,
    AssessmentsComponent,
    TakeAssessmentComponent,
    LiveInterviewComponent,
    RegisterEmployerComponent,
    DashboardEmployerComponent,
    DashboardEmployerUpdateComponent,
    ActiveJobListingsComponent,
    JobsAppliedComponent,
    ActiveCandidateApplicationsComponent,
    EditJobPostingComponent,
    GiveInterviewComponent,
    ViewAnswersComponent,
    JobResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    WebcamModule,
    ReactiveFormsModule
  ],
  providers: [AudioRecordingService, VideoRecordingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
