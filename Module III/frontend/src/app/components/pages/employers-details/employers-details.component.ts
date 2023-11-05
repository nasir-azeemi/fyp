import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from 'src/app/global-variables.service';

@Component({
  selector: 'app-employers-details',
  templateUrl: './employers-details.component.html',
  styleUrls: ['./employers-details.component.scss']
})
export class EmployersDetailsComponent implements OnInit {

  constructor(public global_vars: GlobalVariablesService) { }

  ngOnInit(): void {
  }

}
