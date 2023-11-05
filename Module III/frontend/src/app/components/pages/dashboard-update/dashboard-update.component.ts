import { Component, OnInit } from '@angular/core';
import { Education_Interface, GlobalVariablesService } from 'src/app/global-variables.service';
import { RoutingService } from 'src/app/routing.service';
import { SocketService } from 'src/app/socket.service';

import { Work_Experience_Interface } from 'src/app/global-variables.service';

@Component({
  selector: 'app-dashboard-update',
  templateUrl: './dashboard-update.component.html',
  styleUrls: ['./dashboard-update.component.scss']
})
export class DashboardUpdateComponent implements OnInit {

  skill = "";

  constructor(private routing_service: RoutingService, private socket_service: SocketService, public global_vars: GlobalVariablesService) { }

  ngOnInit(): void 
  {
    this.global_vars.work_to_delete = [];
    this.global_vars.education_to_delete = [];
  }

  to_dashboard()
  {
    this.global_vars.user_data.Gender = (<HTMLInputElement>document.getElementById("gender_select")).value;
    
    this.global_vars.updated_user_data_backend = false;
    this.global_vars.updated_work_data_backend = false;
    this.global_vars.updated_education_data_backend = false;
    this.global_vars.deleted_work_data_backend = false;
    this.global_vars.deleted_education_data_backend = false;

    this.socket_service.update_data_and_go_dashboard();
  }

  add_work_experience()
  {
    let to_add: Work_Experience_Interface = {idwork_experience: null, Designation: "", Company: "", 
                                              Starting_Year: "", Ending_Year: "", Location: "", 
                                              Job_Responsibilities: "", user_candidate_fk: this.global_vars.user_data.iduser_candidate};

    this.global_vars.work_experience.push(to_add);
  }

  remove_work_experience(index)
  {
    if (this.global_vars.work_experience[index].idwork_experience != null)
      this.global_vars.work_to_delete.push(this.global_vars.work_experience[index].idwork_experience);
    this.global_vars.work_experience.splice(index, 1);
  }


  add_education()
  {
    let to_add: Education_Interface = {ideducation: null, Title: "", Degree: "", 
                                              Institute: "", Location: "", Starting_Year: "", 
                                              Ending_Year: "", About: "",
                                              user_candidate_fk: this.global_vars.user_data.iduser_candidate};

    this.global_vars.education.push(to_add);
  }

  remove_education(index)
  {
    if (this.global_vars.education[index].ideducation != null)
      this.global_vars.education_to_delete.push(this.global_vars.education[index].ideducation);
    this.global_vars.education.splice(index, 1);
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
    this.global_vars.avatar = this.imageSrc;
    this.socket_service.update_avatar();
    // console.log(this.imageSrc)
  }

  add_skill()
  {
    if (this.skill != "")
      this.global_vars.user_data.Skills.push(this.skill);
    
    this.skill = "";
  }

  remove_skill(i)
  {
    this.global_vars.user_data.Skills.splice(i, 1);
  }
}
