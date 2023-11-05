import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import { SocketService } from 'src/app/socket.service';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-answers',
  templateUrl: './view-answers.component.html',
  styleUrls: ['./view-answers.component.scss']
})
export class ViewAnswersComponent implements OnInit {

  constructor(public global_vars: GlobalVariablesService, private socket_service: SocketService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void 
  {
    this.global_vars.videos["video_1"] = this.sanitizer.bypassSecurityTrustResourceUrl(this.global_vars.videos["video_1"]);
    this.global_vars.videos["video_2"] = this.sanitizer.bypassSecurityTrustResourceUrl(this.global_vars.videos["video_2"]);
    this.global_vars.videos["video_3"] = this.sanitizer.bypassSecurityTrustResourceUrl(this.global_vars.videos["video_3"]);
    
    console.log(this.global_vars.videos);
  }

}
