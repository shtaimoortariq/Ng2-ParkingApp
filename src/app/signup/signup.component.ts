import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersAuthService } from "../providers/users-auth.service";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder,
    private usersAuthService: UsersAuthService) {

    this.createForm();

  }

  ngOnInit() {
  }

  createForm() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      contactNo: ['', Validators.required],
      type: 'user'
    })
  }


  signupUser() {

    console.log(this.signupForm.value);
    this.usersAuthService.createFirebaseUser(this.signupForm.value).then((data)=> {
      this.usersAuthService.getCurrentUserId().subscribe((data)=>console.log(data));
    });
    
  }

}