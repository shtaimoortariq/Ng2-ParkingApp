import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersAuthService } from "../providers/users-auth.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;


  constructor(public fb: FormBuilder,
    public router: Router,
    private userAuthService: UsersAuthService) {

    this.createForm();
    // userAuthService.createFirebaseUser()
    //   .then((data) => {
    //     alert(data.message)
    //   })
    //   .catch((error) => {
    //     alert(error.message)
    //   });

  }

  ngOnInit() {


  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['admin@admin.com', Validators.required],
      password: ['123123', Validators.required]
    })

  }


  loginUser() {
    this.userAuthService.signInFirebaseUser(this.loginForm.value).then((login) => {
      this.userAuthService.getUserProfile().subscribe((profile) => {
        if(profile.type == 'admin') {
          this.router.navigate(['admin/viewAllBookings'])
        }
        else {
          this.router.navigate(['user/viewParking'])
        }
      })
    })

  }


}
