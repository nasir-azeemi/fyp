import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';

import { GlobalVariablesService } from './global-variables.service';
import { RoutingService } from './routing.service';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket, private global_vars: GlobalVariablesService, private routing_service: RoutingService, private cookie_service: CookieService) 
  {
    this.on_register_reply().subscribe((data: any) => {
      if (data.account_created == false)
      {
        global_vars.error = `${data.duplicate.join(", ")} already in use.`
        global_vars.hide_error = false;
      }
      else
      {
        this.global_vars.user_data = data["details"];
        this.global_vars.user_data_retrieved = true;

        this.cookie_service.set('email', data["details"]["Email"]);
        this.cookie_service.set('password', data["details"]["Password"]);
        this.cookie_service.set('user_type', "candidate");
        this.global_vars.user_type = "candidate";

        this.routing_service.register_to_dashboard();
      }
    });

    this.on_employer_register_reply().subscribe((data: any) => {
      if (data.account_created == false)
      {
        global_vars.error = `${data.duplicate.join(", ")} already in use.`
        global_vars.hide_error = false;
      }
      else
      {
        this.global_vars.employer_data = data["details"];
        this.global_vars.user_data_retrieved = true;

        this.cookie_service.set('email', data["details"]["Email"]);
        this.cookie_service.set('password', data["details"]["Password"]);
        this.cookie_service.set('user_type', "employer");
        this.global_vars.user_type = "employer";

        this.routing_service.register_to_employer_dashboard();
      }
    });
  
    this.on_login_reply().subscribe((data: any) => {
      if (data != null)
      {
        if (data["Skills"] != null)
        {
          if (data["Skills"].trim() != "")
            data["Skills"] = data["Skills"].split("\n");
          else
            data["Skills"] = [];
        }
        else
            data["Skills"] = [];

        this.global_vars.user_data = data;
        this.global_vars.user_data_retrieved = true;

        console.log(data);

        this.cookie_service.set('email', data["Email"]);
        this.cookie_service.set('password', data["Password"]);
        this.cookie_service.set('user_type', "candidate");
        this.global_vars.user_type = "candidate";

        this.routing_service.login_to_dashboard();
      }
      else
      {
        global_vars.error = "Invalid email/password."
        global_vars.hide_error = false;
      }
    });

    this.on_employer_login_reply().subscribe((data: any) => {
      if (data != null)
      {
        this.global_vars.employer_data = data;
        this.global_vars.user_data_retrieved = true;

        console.log(data);

        this.cookie_service.set('email', data["Email"]);
        this.cookie_service.set('password', data["Password"]);
        this.cookie_service.set('user_type', "employer");
        this.global_vars.user_type = "employer";

        this.routing_service.login_to_employer_dashboard();
      }
      else
      {
        global_vars.error = "Invalid email/password."
        global_vars.hide_error = false;
      }
    });
  


  
    this.on_dashboard_info_reply().subscribe((data: any) => {
      this.dashboard_reply_job(data);
    });
  
    



    this.on_updated_user_data().subscribe((data: any) => {
      this.global_vars.updated_user_data_backend = true;

      this.recall_data();
    });

    this.on_updated_work_data().subscribe((data: any) => {
      this.global_vars.updated_work_data_backend = true;

      this.recall_data();
    });

    this.on_updated_education_data().subscribe((data: any) => {
      this.global_vars.updated_education_data_backend = true;

      this.recall_data();
    });
    
    this.on_deleted_work_data().subscribe((data: any) => {
      this.global_vars.deleted_work_data_backend = true;

      this.recall_data();
    });

    this.on_deleted_education_data().subscribe((data: any) => {
      this.global_vars.deleted_education_data_backend = true;

      this.recall_data();
    });




    this.on_assessment_names().subscribe((data: any) => {
      console.log(data);

      this.global_vars.assessment_names = data["assessment_names_reply"];

      this.sort_assessment_saved_results(data["assessment_saved_results_reply"]);

      this.global_vars.assessment_names_retrieved_2 = true;
    });


    this.on_assessment_saved_results().subscribe((data: any) => {
      console.log(data);

      this.sort_assessment_saved_results(data);

      // this.global_vars.assessment_names_retrieved_1 = true;
    });


    this.on_assessment_questions().subscribe((data: any) => {
      // console.log(data);
      this.global_vars.assessment_questions = data;

      this.global_vars.current_question = this.global_vars.assessment_questions["Q1"];
    });

    this.on_assessment_replies().subscribe((data: any) => {
      // console.log(data);

      this.sort_assessment_replies(data);
    });

    this.on_assessment_answers_reply().subscribe((data: any) => {
      console.log(data);
      this.global_vars.assessment_result = data;
    });

    this.on_job_applications_reply().subscribe((data: any) => {
      console.log(data);
      this.global_vars.job_applications = data;
    });


    this.on_apply_job_reply().subscribe((data: any) => {
      // console.log(data);
      if (data["applied"])
      {
        this.global_vars.viewing_job.applied = true;
        this.login({"email": this.global_vars.user_data["Email"], "password": this.global_vars.user_data["Password"]});
      }
    });


    this.on_send_snapshot_reply().subscribe((data: any) => {
      // console.log(data);
      this.global_vars.test_current_emotion = data;
    });


    this.on_get_interviews_scheduled_reply().subscribe((data: any) => {
      console.log(data);
      this.global_vars.interviews_scheduled = data;
    });

    this.on_get_interviews_complete_reply().subscribe((data: any) => {
      console.log(data);
      this.global_vars.interviews_complete = data;
    }); 


    this.on_send_interview_video_reply().subscribe((data: any) => {
      console.log(data);
      this.global_vars.record_interview = true;
    }); 


    this.on_end_interview_reply().subscribe((data: any) => {
      console.log(data);

      this.routing_service.give_interview_to_interview();
    });


    this.on_get_job_results_reply().subscribe((data: any) => {
      console.log(data);

      this.global_vars.job_results = data;
    });







    // EMPLOYER FUNCTIONS

    this.on_post_job_reply().subscribe((data: any) => {
      console.log(data);
      this.routing_service.register_to_employer_dashboard();
    });

    this.on_edit_job_reply().subscribe((data: any) => {
      console.log(data);
      this.routing_service.register_to_employer_dashboard();
    });

    this.on_hide_job_reply().subscribe((data: any) => {
      console.log(data);
      this.routing_service.register_to_employer_dashboard();
    });

    this.on_delete_job_reply().subscribe((data: any) => {
      console.log(data);
      this.routing_service.register_to_employer_dashboard();
    });


    this.on_get_jobs_reply().subscribe((data: any) => {
      console.log(data);
      this.global_vars.jobs = data;
    });


    this.on_get_organization_details_reply().subscribe((data: any) => {
      console.log(data);
      this.global_vars.viewing_job.organization = data;

      this.routing_service.job_listing_to_job_details();
    });


    this.on_get_employers_reply().subscribe((data: any) => {
      console.log(data);
      this.global_vars.employers = data;
    });



    this.on_update_employer_data_and_go_dashboard_reply().subscribe((data: any) => {
      console.log(data);
      
      this.global_vars.updated_employer_data_backend = true;

      this.routing_service.employer_dashboardupdate_to_dashboard();
    });


    this.on_get_candidates_details_reply().subscribe((data: any) => {
      console.log(data);
      
      this.global_vars.candidate_applications = data;

      for(let i in data)
      {
        for(let j of data[i])
        {
          this.get_candidate_resume({type: "all", iduser_candidate: j["iduser_candidate"], reply_emit: "all"});
        }
      }

      this.routing_service.job_listings_to_active_candidate_applications();
    });

    this.on_get_all_candidate_resume_reply().subscribe((data: any) => {
      var key = "";
      key = data[3];
      // if (data[0].length > 0)
      //   key = data[0][0].user_candidate_fk;
      // else if (data[1].length > 0)
      //   key = data[1][0].user_candidate_fk;
      
      for(let i in this.global_vars.candidate_applications)
      {
        for(let j in this.global_vars.candidate_applications[i])
        {
          if (this.global_vars.candidate_applications[i][j]["iduser_candidate"] == key)
          {
            if (data[4].length > 0)
              this.global_vars.candidate_applications[i][j]["personality"] = data[4][0]["Result"].slice(0,4);
            else
              this.global_vars.candidate_applications[i][j]["personality"] = "N/A";

            this.global_vars.candidate_applications[i][j]["avatar"] = 'data:image/jpeg;base64,' + data[2];
            this.global_vars.candidate_applications[i][j]["work_exp"] = data[0];
            this.global_vars.candidate_applications[i][j]["educ"] = data[1];
          }
        }
      }
      // this.routing_service.job_listings_to_active_candidate_applications();

      console.log(this.global_vars.candidate_applications);
    });

    this.on_get_candidate_resume_reply().subscribe((data: any) => {
      console.log(data);
      global_vars.avatar = 'data:image/jpeg;base64,' + data[2];
      this.dashboard_reply_job(data);

      this.routing_service.active_candidate_applications_to_resume();
    });


    this.on_login_reply_pic().subscribe((data: any) => {
      // console.log(data);

      this.global_vars.avatar = 'data:image/jpeg;base64,' + data;
    });

    this.on_employer_login_reply_pic().subscribe((data: any) => {
      // console.log(data);

      this.global_vars.employer_avatar = 'data:image/jpeg;base64,' + data;
    });

    this.on_reject_candidate_reply().subscribe((data: any) => {
      console.log(data);
    });

    this.on_accept_candidate_reply().subscribe((data: any) => {
      console.log(data);
    });


    this.on_get_videos_reply().subscribe((data: any) => {
      console.log(data);

      this.global_vars.videos = data;

      this.routing_service.active_candidate_applications_to_view_answers();
    });

    this.on_accept_candidate_answers_reply().subscribe((data: any) => {
      console.log(data);
    });

    this.on_reject_candidate_answers_reply().subscribe((data: any) => {
      console.log(data);
    });
  }

  validate_input(data)
  {
    for (let property in data)
    {
      if (data[property] == "")
        return false;
    }
    
    return true;
  }

  register(data)
  {
    this.socket.emit("register", data);
  }

  on_register_reply()
  {
    return this.socket.fromEvent("register_reply");
  }

  login(data)
  {
    this.socket.emit("login", data);
  }

  on_login_reply()
  {
    return this.socket.fromEvent("login_reply");
  }


  dashboard_info()
  {
    this.socket.emit("dashboard_info", this.global_vars.user_data.iduser_candidate);
  }

  on_dashboard_info_reply()
  {
    return this.socket.fromEvent("dashboard_info_reply");
  }

  dashboard_reply_job(data)
  {
    this.global_vars.work_experience = data[0];

    this.global_vars.education = data[1];
  }


  update_data_and_go_dashboard()
  {
    this.socket.emit("update_data", {"user_data": this.global_vars.user_data, 
    "work_experience": this.global_vars.work_experience, 
    "education": this.global_vars.education, 
    "work_to_delete": this.global_vars.work_to_delete,
    "education_to_delete": this.global_vars.education_to_delete});

    this.routing_service.dashboardupdate_to_dashboard();
  }




  on_updated_user_data()
  {
    return this.socket.fromEvent("updated_user_data");
  }

  on_updated_work_data()
  {
    return this.socket.fromEvent("updated_work_data");
  }

  on_updated_education_data()
  {
    return this.socket.fromEvent("updated_education_data");
  }



  on_deleted_work_data()
  {
    return this.socket.fromEvent("deleted_work_data");
  }
  on_deleted_education_data()
  {
    return this.socket.fromEvent("deleted_education_data");
  }

  recall_data()
  {
    if (this.global_vars.updated_user_data_backend && this.global_vars.updated_education_data_backend && this.global_vars.updated_work_data_backend && this.global_vars.deleted_work_data_backend && this.global_vars.deleted_education_data_backend)
      this.dashboard_info();
  }


  get_assessment_names()
  {
    this.socket.emit("assessment_names", {iduser_candidate: this.global_vars.user_data.iduser_candidate});
  }

  on_assessment_names()
  {
    return this.socket.fromEvent("assessment_names_reply");
  }

  on_assessment_saved_results()
  {
    return this.socket.fromEvent("assessment_saved_results_reply");
  }

  sort_assessment_saved_results(data)
  {
    for(let i = 0; i < this.global_vars.assessment_names.length; i++)
    {
      this.global_vars.assessment_names[i]["to_disable"] = false;
    }

    for(let i = 0; i < data.length; i++)
    {
      // console.log(data[i]["Result"])
      this.global_vars.saved_assessment_results[data[i]["idAssessments"]] = data[i]["Result"].split("%");

      if (data[i]["idAssessments"] == "1")
      {
        for (let i = 0; i < this.global_vars.saved_assessment_results["1"].length; i++)
        {
          this.global_vars.saved_assessment_results["1"][i] += "%";
        }

        this.global_vars.saved_assessment_results["1"].pop()
      }
      else
      {
        // console.log(this.global_vars.saved_assessment_results["2"]);
        this.global_vars.saved_assessment_results["2"].push(this.global_vars.saved_assessment_results["2"][i].slice(4));
        this.global_vars.saved_assessment_results["2"][0] = this.global_vars.saved_assessment_results["2"][0].slice(0, 4);
      }

      this.global_vars.assessment_names[data[i]["idAssessments"] - 1]["to_disable"] = true;
    }
    // console.log(this.global_vars.assessment_names);
    this.global_vars.assessment_names_retrieved_1 = true;

  }
  
  get_assessment_questions(id_assessment)
  {
    this.socket.emit("assessment_questions", {idAssessments: id_assessment});
  }

  on_assessment_questions()
  {
    return this.socket.fromEvent("assessment_questions_reply");
  }

  on_assessment_replies()
  {
    return this.socket.fromEvent("assessment_replies_reply");
  }


  sort_assessment_replies(data)
  {
    for(let i = 0; i < data.length; i++)
    {
      this.global_vars.assessment_replies["Q" + (i+1).toString()] = {Reply1: data[i].Reply1, Reply2: data[i].Reply2};
    }
    console.log(data);
    this.global_vars.current_reply1 = this.global_vars.assessment_replies["Q1"]["Reply1"];
    this.global_vars.current_reply2 = this.global_vars.assessment_replies["Q1"]["Reply2"];
  }

  send_result()
  {
    this.global_vars.assessment_answers["idAssessments"] = this.global_vars.assessment_questions["idAssessments"];

    this.global_vars.assessment_answers["iduser_candidate"] = this.global_vars.user_data.iduser_candidate;

    this.socket.emit("assessment_answers", this.global_vars.assessment_answers);
  }

  on_assessment_answers_reply()
  {
    return this.socket.fromEvent("assessment_answers_reply");
  }

  on_job_applications_reply()
  {
    return this.socket.fromEvent("job_applications_reply");
  }

  apply_job()
  {
    this.socket.emit("apply_job", {iduser_candidate: this.global_vars.user_data["iduser_candidate"], idjob_postings: this.global_vars.viewing_job.job["idjob_postings"], Assessments_Required: this.global_vars.viewing_job.job["Assessments_Required"]});
  }

  on_apply_job_reply()
  {
    return this.socket.fromEvent("apply_job_reply");
  }

  send_snapshot(image)
  {
    this.socket.emit("snapshot", {iduser_candidate: this.global_vars.user_data["iduser_candidate"], image: image});
  }

  on_send_snapshot_reply()
  {
    return this.socket.fromEvent("snapshot_reply");
  }

  on_login_reply_pic()
  {
    return this.socket.fromEvent("login_reply_pic");
  }

  
  update_avatar()
  {
    this.socket.emit("update_avatar_candidate", {iduser_candidate: this.global_vars.user_data.iduser_candidate, avatar: this.global_vars.avatar});
  }


  get_interviews_scheduled()
  {
    this.socket.emit("get_interviews_scheduled", {iduser_candidate: this.global_vars.user_data.iduser_candidate});
  }

  on_get_interviews_scheduled_reply()
  {
    return this.socket.fromEvent("get_interviews_scheduled_reply");
  }

  on_get_interviews_complete_reply()
  {
    return this.socket.fromEvent("get_interviews_complete_reply");
  }


  send_interview_video(result, question)
  {
    // console.log("interview video send", result, question);
    this.socket.emit("send_interview_video", {iduser_candidate: this.global_vars.user_data.iduser_candidate, idjob_postings: this.global_vars.giving_interview["idjob_postings"], data: result, Question: question});
  }

  on_send_interview_video_reply()
  {
    return this.socket.fromEvent("send_interview_video_reply");
  }

  end_interview()
  {
    this.socket.emit("end_interview", {iduser_candidate: this.global_vars.user_data.iduser_candidate, idjob_postings: this.global_vars.giving_interview["idjob_postings"]})
  }

  on_end_interview_reply()
  {
    return this.socket.fromEvent("end_interview_reply");
  }

  get_job_results()
  {
    this.socket.emit("get_job_results", {iduser_candidate: this.global_vars.user_data["iduser_candidate"]});
  }

  on_get_job_results_reply()
  {
    return this.socket.fromEvent("get_job_results_reply");
  }





  // EMPLOYER Functions

  employer_register(data)
  {
    this.socket.emit("employer_register", data);
  }

  on_employer_register_reply()
  {
    return this.socket.fromEvent("employer_register_reply");
  }

  employer_login(data)
  {
    this.socket.emit("employer_login", data);
  }

  on_employer_login_reply()
  {
    return this.socket.fromEvent("employer_login_reply");
  }

  on_employer_login_reply_pic()
  {
    return this.socket.fromEvent("employer_login_reply_pic");
  }

  employer_update_avatar()
  {
    this.socket.emit("update_avatar_employer", {idemployer: this.global_vars.employer_data.idemployer, avatar: this.global_vars.employer_avatar});
  }

  post_job(job_posting_details)
  {
    this.socket.emit("post_job", job_posting_details);
  }

  edit_job(job_posting_details)
  {
    this.socket.emit("edit_job", job_posting_details);
  }

  hide_job(job_posting_details)
  {
    this.socket.emit("hide_job", {idjob_postings: job_posting_details["idjob_postings"], Hidden: job_posting_details["Hidden"]});
  }

  delete_job(job_posting_details)
  {
    this.socket.emit("delete_job", {idjob_postings: job_posting_details["idjob_postings"]});
  }

  on_post_job_reply()
  {
    return this.socket.fromEvent("post_job_reply");
  }

  on_edit_job_reply()
  {
    return this.socket.fromEvent("edit_job_reply");
  }

  on_hide_job_reply()
  {
    return this.socket.fromEvent("hide_job_reply");
  }

  on_delete_job_reply()
  {
    return this.socket.fromEvent("delete_job_reply");
  }

  get_jobs()
  {
    this.socket.emit("get_jobs");
  }

  on_get_jobs_reply()
  {
    return this.socket.fromEvent("get_jobs_reply");
  }

  get_organization_details()
  {
    this.socket.emit("organization_details", this.global_vars.viewing_job.job.idemployer);
  }

  on_get_organization_details_reply()
  {
    return this.socket.fromEvent("organization_details_reply");
  }

  get_employers()
  {
    this.socket.emit("get_employers");
  }

  on_get_employers_reply()
  {
    return this.socket.fromEvent("get_employers_reply");
  }

  update_employer_data_and_go_dashboard()
  {
    this.socket.emit("update_employer_data", this.global_vars.employer_data);
  }

  on_update_employer_data_and_go_dashboard_reply()
  {
    return this.socket.fromEvent("update_employer_data_reply");
  }

  get_self_jobs()
  {
    this.socket.emit("get_self_jobs", this.global_vars.employer_data.idemployer);
  }

  on_get_self_jobs_reply()
  {
    return this.socket.fromEvent("get_self_jobs_reply");
  }

  get_required_assessment_names()
  {
    this.global_vars.viewing_assessments_required = [];
    
    this.global_vars.viewing_job.job["Assessments_Required"] = this.global_vars.viewing_job.job["Assessments_Required"].split("\n")
    for (let i of this.global_vars.viewing_job.job["Assessments_Required"])
    {
      this.global_vars.viewing_assessments_required.push(this.global_vars.assessments_name_mapping[i]);
    }
  }

  get_candidates_details()
  {
    this.socket.emit("get_candidates_details", this.global_vars.viewing_job.job["idjob_postings"]);
  }
  
  on_get_candidates_details_reply()
  {
    return this.socket.fromEvent("get_candidates_details_reply");
  }
  
  on_get_all_candidate_resume_reply()
  {
    return this.socket.fromEvent("get_all_candidate_resume_reply");
  }

  get_candidate_resume(reply_emit)
  {
    if (reply_emit["type"] == "one")
      this.socket.emit("get_candidate_resume", {iduser_candidate: this.global_vars.user_data.iduser_candidate, reply_emit: reply_emit["reply_emit"]});
    else
      this.socket.emit("get_candidate_resume", {iduser_candidate: reply_emit["iduser_candidate"], reply_emit: reply_emit["reply_emit"]});
  }

  on_get_candidate_resume_reply()
  {
    return this.socket.fromEvent("get_candidate_resume_reply");
  }

  reject_candidate(iduser_candidate, idjob_postings)
  {
    this.socket.emit("reject_candidate", {iduser_candidate: iduser_candidate, idjob_postings: idjob_postings});
  }

  on_reject_candidate_reply()
  {
    return this.socket.fromEvent("reject_candidate_reply");
  }

  accept_candidate(iduser_candidate, idjob_postings)
  {
    this.socket.emit("accept_candidate", {iduser_candidate: iduser_candidate, idjob_postings: idjob_postings});
  }

  on_accept_candidate_reply()
  {
    return this.socket.fromEvent("accept_candidate_reply");
  }

  get_videos(iduser_candidate, idjob_postings)
  {
    this.socket.emit("get_videos", {iduser_candidate: iduser_candidate, idjob_postings: idjob_postings});
  }

  on_get_videos_reply()
  {
    return this.socket.fromEvent("get_videos_reply");
  }

  accept_candidate_answers(iduser_candidate, idjob_postings)
  {
    this.socket.emit("accept_candidate_answers", {iduser_candidate: iduser_candidate, idjob_postings: idjob_postings});
  }

  reject_candidate_answers(iduser_candidate, idjob_postings)
  {
    this.socket.emit("reject_candidate_answers", {iduser_candidate: iduser_candidate, idjob_postings: idjob_postings});
  }

  on_accept_candidate_answers_reply()
  {
    return this.socket.fromEvent("accept_candidate_answers_reply");
  }

  on_reject_candidate_answers_reply()
  {
    return this.socket.fromEvent("reject_candidate_answers_reply");
  }
}
