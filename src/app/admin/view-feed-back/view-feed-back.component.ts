import { Component, OnInit } from '@angular/core';
import { UsersAuthService } from "../../providers/users-auth.service";
import { ChatService } from "../../providers/chat.service";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-view-feed-back',
  templateUrl: './view-feed-back.component.html',
  styleUrls: ['./view-feed-back.component.css']
})
export class ViewFeedBackComponent implements OnInit {

  allUsers = [];
  allUsersKey = [];
  currentUser;
  currentUserFlag = false;
  currentUserChat: FirebaseListObservable<any>;
  adminChat: FormGroup;
  currentPersonIndex;

  constructor(private usersAuthService: UsersAuthService,
    private chatService: ChatService,
    private db: AngularFireDatabase,
    private fb: FormBuilder) {
    this.createForm();
  }


  ngOnInit() {
    this.usersAuthService.getAllUsers().subscribe((data) => {
      this.allUsers = data;
      this.allUsersKey = this.usersAuthService.getAllUsersKey;
      console.log(this.allUsersKey);
    })
  }


  createForm() {
    this.adminChat = this.fb.group({
      chatMessage: ['', Validators.required]
    })
  }

  viewChat(index) {
    this.currentPersonIndex = index;
    console.log(this.allUsers[index]);
    console.log(this.allUsersKey[index]);
    this.currentUser = this.allUsers[index];
    this.currentUserFlag = true;
    //this.chatService.getMsgFromNode(this.allUsersKey[index])
    this.currentUserChat = this.db.list('chat/' + this.allUsersKey[index])
  }

  reply() {
  
    
    this.chatService.sendReplyFromAdmin(this.allUsersKey[this.currentPersonIndex], this.adminChat.value.chatMessage);
  }




}
