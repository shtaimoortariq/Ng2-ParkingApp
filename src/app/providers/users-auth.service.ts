import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';


@Injectable()
export class UsersAuthService {


  userRegistration: FirebaseObjectObservable<any>;
  allUsers: FirebaseListObservable<any>;
  allUsersKey = [];
  allUsersVal = [];
  //userProfile: FirebaseObjectObservable<any>;
  authState;
  userProfile;
  userType;



  constructor(public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public router: Router) {

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
      console.log(this.authState);
      console.log("Auth Changes");

    })
  }

  signInFirebaseUser(loginForm) {
    return this.afAuth.auth.signInWithEmailAndPassword(loginForm.email, loginForm.password)
      .then((data) => {console.log(data);this.getUserProfile()})
      .catch((error) => console.log(error));
  }


  createFirebaseUser(signupForm): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(signupForm.userName, signupForm.password)
      .then((data) => {


        this.userRegistration = this.db.object('/userRegistration/' + this.afAuth.auth.currentUser.uid);
        this.userRegistration.set(signupForm).then(() => this.getUserProfile());
        //this.router.navigate(['/dashboard']);
      })
      .catch(error => console.log("Error"));

  }


  getUserProfile(): Observable<any> {
    console.log("getUserProfile");

    this.userRegistration = this.db.object('/userRegistration/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
    return this.userRegistration.map((data) => {
      this.userProfile = data.val();
      console.log(this.userProfile);
      return this.userProfile;
    })

  }

  get myProfile() {
    return this.userProfile;
  }

  logoutFirebaseUser() {
    console.log("signout");
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }



  getCurrentUserId() {

    return this.afAuth.authState.map(authState => {
      return authState.uid;
    })

  }

  get uid(): any {
    return this.authState.uid;
  }


  getAllUsers(): Observable<any> {

    this.allUsers = this.db.list('userRegistration', { preserveSnapshot: true })
    return this.allUsers.map((uidies) => {
      this.allUsersKey = [];
      this.allUsersVal = [];
      uidies.forEach(data => {
        this.allUsersKey.push(data.key);
        this.allUsersVal.push(data.val());
      });
      return this.allUsersVal;
    })
  }

  get getAllUsersKey(): any {
    return this.allUsersKey;
  }

}
