import { Component, OnInit } from '@angular/core';
import { UsersAuthService } from "../providers/users-auth.service";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private usersAuthService: UsersAuthService) {

    
   }

  ngOnInit() {

  }


    logout() {
      this.usersAuthService.logoutFirebaseUser();
  }

}
