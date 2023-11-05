import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from 'src/app/global-variables.service';

@Component({
  selector: 'app-navbar-style-three',
  templateUrl: './navbar-style-three.component.html',
  styleUrls: ['./navbar-style-three.component.scss']
})
export class NavbarStyleThreeComponent implements OnInit {

  constructor(public global_vars: GlobalVariablesService) { }

  ngOnInit(): void {
  }

}
