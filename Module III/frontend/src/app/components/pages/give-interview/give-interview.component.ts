import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { AudioRecordingService } from './audio-recording.service';
import { VideoRecordingService } from './video-recording.service';
import { DomSanitizer } from '@angular/platform-browser';

import { GlobalVariablesService } from 'src/app/global-variables.service';
import { RoutingService } from 'src/app/routing.service';
import { SocketService } from 'src/app/socket.service';


@Component({
  selector: 'app-give-interview',
  templateUrl: './give-interview.component.html',
  styleUrls: ['./give-interview.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class GiveInterviewComponent implements OnDestroy {

  @ViewChild('videoElement1',{static: true}) videoElement1: any;
  @ViewChild('videoElement2',{static: true}) videoElement2: any;
  @ViewChild('videoElement3',{static: true}) videoElement3: any;
  video: any;
  isPlaying = false;
  displayControls = true;
  isAudioRecording = false;
  isVideoRecording = false;
  audioRecordedTime;
  videoRecordedTime;
  audioBlobUrl;
  videoBlobUrl1;
  videoBlobUrl2;
  videoBlobUrl3;
  audioBlob;
  videoBlob;
  audioName;
  videoName;
  audioStream;
  videoStream: MediaStream;
  audioConf = { audio: true}
  videoConf = { video: { facingMode:"user", width: 320 }, audio: true}

  current_question;

  hide_record_1;
  hide_record_2;
  hide_record_3;

  constructor(
    private ref: ChangeDetectorRef,
    private audioRecordingService: AudioRecordingService,
    private videoRecordingService: VideoRecordingService,
    private sanitizer: DomSanitizer,
    private routing_service: RoutingService,
    private socket_service: SocketService,
    public global_vars: GlobalVariablesService
  ) {

    this.videoRecordingService.recordingFailed().subscribe(() => {
      this.isVideoRecording = false;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getRecordedTime().subscribe((time) => {
      this.videoRecordedTime = time;
      this.ref.detectChanges();

      if (time.substring(0, 2) != "00")
        this.stopVideoRecording();
    });

    this.videoRecordingService.getStream().subscribe((stream) => {
      this.videoStream = stream;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getRecordedBlob().subscribe((data) => {
      this.videoBlob = data.blob;
      this.videoName = data.title;

      if (this.current_question == 1)
      {
        this.videoBlobUrl1 = this.sanitizer.bypassSecurityTrustUrl(data.url);
        if (this.videoBlobUrl1 != undefined)
          this.upload_video(data.url);
      }
      else if (this.current_question == 2)
      {
        this.videoBlobUrl2 = this.sanitizer.bypassSecurityTrustUrl(data.url);
        if (this.videoBlobUrl2 != undefined)
          this.upload_video(data.url);
      }
      else if (this.current_question == 3)
      {
        this.videoBlobUrl3 = this.sanitizer.bypassSecurityTrustUrl(data.url);
        if (this.videoBlobUrl3 != undefined)
          this.upload_video(data.url);
      }  

      this.ref.detectChanges();

      // if (this.videoBlobUrl != undefined)
      //   this.upload_video(data.url);
    });

    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isAudioRecording = false;
      this.ref.detectChanges();
 });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.audioRecordedTime = time;
      this.ref.detectChanges();
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.audioBlob = data.blob;
      this.audioName = data.title;
      this.audioBlobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
      this.ref.detectChanges();
    });
  }

  ngOnInit() {
    this.video = this.videoElement1.nativeElement;

    this.hide_record_1 = false;
    this.hide_record_2 = false;
    this.hide_record_3 = false;
  }

  startVideoRecording(i) {
    if (!this.isVideoRecording) {
      this.current_question = i;
      
      if (i == 1)
        this.video = this.videoElement1.nativeElement;
      else if (i == 2)
        this.video = this.videoElement2.nativeElement;
      else if (i == 3)
        this.video = this.videoElement3.nativeElement;

      this.ref.detectChanges();
      
      this.video.controls = false;
      this.isVideoRecording = true;
      this.videoRecordingService.startRecording(this.videoConf)
      .then(stream => {
        // this.video.src = window.URL.createObjectURL(stream);
        this.video.srcObject = stream;
        this.video.play();
      })
      .catch(function (err) {
        console.log(err.name + ": " + err.message);
      });
    }
  }

  abortVideoRecording() {
    if (this.isVideoRecording) {
      this.isVideoRecording = false;
      this.videoRecordingService.abortRecording();
      this.video.controls = false;
    }
  }

  stopVideoRecording() {
    if (this.isVideoRecording) {
      this.videoRecordingService.stopRecording();
      
      if (this.current_question == 1)
      {
        this.video.srcObject = this.videoBlobUrl1;
      }
      else if (this.current_question == 2)
      {
        this.video.srcObject = this.videoBlobUrl2;
      }
      else if (this.current_question == 3)
      {
        this.video.srcObject = this.videoBlobUrl3;
      }
      console.log(this.video);
      // this.video.srcObject = this.videoBlobUrl;
      this.isVideoRecording = false;
      this.video.controls = true;

      if (this.current_question == 1)
        this.hide_record_1 = true;
      
      else if (this.current_question == 2)
        this.hide_record_2 = true;
      
      else if (this.current_question == 3)
        this.hide_record_3 = true;
      
      this.ref.detectChanges();
    }
  }

  clearVideoRecordedData() {
    // this.videoBlobUrl = null;
    this.video.srcObject = null;
    // this.video.controls = false;
    this.ref.detectChanges();
  }

  downloadVideoRecordedData() {
    this._downloadFile(this.videoBlob, 'video/mp4', this.videoName);
  }

  startAudioRecording() {
    if (!this.isAudioRecording) {
      this.isAudioRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortAudioRecording() {
    if (this.isAudioRecording) {
      this.isAudioRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopAudioRecording() {
    if (this.isAudioRecording) {
      this.audioRecordingService.stopRecording();
      this.isAudioRecording = false;
    }
  }

  clearAudioRecordedData() {
    this.audioBlobUrl = null;
  }

  downloadAudioRecordedData() {
    this._downloadFile(this.audioBlob, 'audio/mp3', this.audioName);
  }

  ngOnDestroy(): void {
    this.abortAudioRecording();
  }

  _downloadFile(data: any, type: string, filename: string): any {
    const blob = new Blob([data], { type: type });
    const url = window.URL.createObjectURL(blob);
    //this.video.srcObject = stream;
    //const url = data;
    const anchor = document.createElement('a');
    anchor.download = filename;
    anchor.href = url;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }


  upload_video(data)
  {
    console.log(data);
    // var blob = new Blob([this.videoBlob], { type: "video/webm" });
    // console.log(this.video.srcObject);
    this.getBase64ImageFromUrl(data).
    then(result => {
      // console.log(result);
      this.socket_service.send_interview_video(result, this.current_question);
      this.clearVideoRecordedData();
    })
  }

  // asd()
  // {
  //   console.log(this.videoBlobUrl);
  // }
  
  async getBase64ImageFromUrl(imageUrl) {
    var res = await fetch(imageUrl);
    var blob = await res.blob();
  
    return new Promise((resolve, reject) => {
      var reader  = new FileReader();
      reader.addEventListener("load", function () {
          resolve(reader.result);
      }, false);
  
      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  }

  end_interview()
  {
    this.socket_service.end_interview();
  }
}
