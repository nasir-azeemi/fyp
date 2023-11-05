import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { RoutingService } from 'src/app/routing.service';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-take-assessment',
  templateUrl: './take-assessment.component.html',
  styleUrls: ['./take-assessment.component.scss']
})
export class TakeAssessmentComponent implements OnInit {

  taking_test = true;

  constructor(public global_vars: GlobalVariablesService, private socket_service: SocketService, private routing_service: RoutingService) { }

  ngOnInit(): void 
  {
    this.global_vars.current_question_number =  1;
    this.global_vars.assessment_answers = {};
    this.global_vars.assessment_result = ["Calculating..."];
  }

  clicked(btn)
  {
    console.log(btn);
    
    this.global_vars.assessment_answers[this.global_vars.current_question_number.toString()] = btn;
    
    this.next_question();


    document.getElementById(btn).blur();
    // let btn_detail = btn.split(" ");
    // let btn_num = parseInt(btn_detail[0], 10);

    // document.getElementById(btn_num.toString() + " st_d").className = "btn st_disagree-btn";
    // document.getElementById(btn_num.toString() + " d").className = "btn disagree-btn";
    // document.getElementById(btn_num.toString() + " sl_d").className = "btn sl_disagree-btn";

    // document.getElementById(btn_num.toString() + " n").className = "btn neutral-btn";

    // document.getElementById(btn_num.toString() + " sl_a").className = "btn sl_agree-btn";
    // document.getElementById(btn_num.toString() + " a").className = "btn agree-btn";
    // document.getElementById(btn_num.toString() + " st_a").className = "btn st_agree-btn";


    // let btn_id = btn.split(" ").join("");

    // // console.log(btn_detail.join(""));
    
    // if (btn_detail[1] == "a")
    // {
    //   document.getElementById(btn_id).className = "agree-btn-clicked";
      
    //   let opposite_btn_id = btn_id.slice(0, btn_id.length-1) + "d";
    //   document.getElementById(opposite_btn_id).className = "disagree-btn";
    // }

    // else if (btn_detail[1] == "d")
    // {
    //   document.getElementById(btn_id).className = "disagree-btn-clicked";

    //   let opposite_btn_id = btn_id.slice(0, btn_id.length-1) + "a";
    //   document.getElementById(opposite_btn_id).className = "agree-btn";
    // }
  }

  next_question()
  {
    // this.global_vars.assessment_questions["Question_Amount"] = 5;
    if ( this.global_vars.current_question_number == this.global_vars.assessment_questions["Question_Amount"] )
    {
      this.taking_test = false;

      this.socket_service.send_result();
    }


    else if (this.global_vars.current_question_number < this.global_vars.assessment_questions["Question_Amount"])
    {
      this.global_vars.current_question_number += 1;

      this.global_vars.current_question = this.global_vars.assessment_questions["Q" + this.global_vars.current_question_number.toString()];

      this.global_vars.current_reply1 = this.global_vars.assessment_replies["Q" + this.global_vars.current_question_number.toString()]["Reply1"];
      this.global_vars.current_reply2 = this.global_vars.assessment_replies["Q" + this.global_vars.current_question_number.toString()]["Reply2"];

      if (this.global_vars.current_question_number.toString() in this.global_vars.assessment_answers)
          document.getElementById(this.global_vars.assessment_answers[this.global_vars.current_question_number.toString()]).focus();
    }
  }

  back_question()
  {
    if (this.global_vars.current_question_number > 1)
    {
      this.global_vars.current_question_number -= 1;
  
      this.global_vars.current_question = this.global_vars.assessment_questions["Q" + this.global_vars.current_question_number.toString()];

      this.global_vars.current_reply1 = this.global_vars.assessment_replies["Q" + this.global_vars.current_question_number.toString()]["Reply1"];
      this.global_vars.current_reply2 = this.global_vars.assessment_replies["Q" + this.global_vars.current_question_number.toString()]["Reply2"];
    }
    
    if (this.global_vars.current_question_number.toString() in this.global_vars.assessment_answers)
      document.getElementById(this.global_vars.assessment_answers[this.global_vars.current_question_number.toString()]).focus();
  }

  to_assessments()
  {
    this.routing_service.dashboard_to_assessment();
  }
}
