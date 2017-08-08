import { Component, OnInit } from '@angular/core';
import { UsersAuthService } from "../providers/users-auth.service";
import { RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private usersAuthService: UsersAuthService) { }

  ngOnInit() {
  }

  logout() {
      this.usersAuthService.logoutFirebaseUser();
  }


}
