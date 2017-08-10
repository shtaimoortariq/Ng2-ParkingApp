import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UsersAuthService } from "./users-auth.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ChatService {

  uid;
  userChatFb: FirebaseListObservable<any>;
  specificUserChatFb: FirebaseListObservable<any>;

  userProfile;

  constructor(private db: AngularFireDatabase,
    private usersAuthService: UsersAuthService) {

    console.log("User Chat");
    usersAuthService.getCurrentUserId().subscribe((data) => {
      this.uid = data;
      console.log(this.uid);
    });

    this.userProfile = this.usersAuthService.getUserProfile().subscribe((data) => {
      this.userProfile = data;
      console.log(this.userProfile);
    });

    //th0is.userProfile = this.usersAuthService.myProfile;
  }


  sendMessage(message) {
    console.log(this.userProfile);
    console.log(message);
    this.userChatFb = this.db.list('chat/' + this.uid);

    this.userChatFb.push({
      name: this.userProfile.name,
      userMessage: message

    })

  }


  getMsgFromNode(uid) {
    this.specificUserChatFb = this.db.list('chat/' + uid, { preserveSnapshot: true })
    this.specificUserChatFb.map((snapShot) => {
      snapShot.forEach(chat => {
        console.log(snapShot.key);
        console.log(snapShot.val());
      });

    })
  }

  sendReplyFromAdmin(currrentPersonUid, message) {
    console.log(currrentPersonUid+'/'+message);
    
    this.db.list('chat/' +currrentPersonUid).push({
      name: 'admin',
      userMessage: message 
    })

  }





} 
