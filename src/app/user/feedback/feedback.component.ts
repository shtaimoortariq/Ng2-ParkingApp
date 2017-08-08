import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../../providers/chat.service'
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { UsersAuthService } from "../../providers/users-auth.service";


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})


export class FeedbackComponent implements OnInit {
  chatForm: FormGroup;
  showChat: FirebaseListObservable<any>;
  uid;


  constructor(public fb: FormBuilder,
    private chatService: ChatService,
    private usersAuthService: UsersAuthService,
    private db: AngularFireDatabase
  ) {
    this.uid = usersAuthService.uid
    this.showChat = this.db.list('chat/' + this.uid);
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.chatForm = this.fb.group({
      message: ['', Validators.required]
    })
  }

  send() {
    console.log(this.chatForm.value.message);
    this.chatService.sendMessage(this.chatForm.value.message);
  }



}
