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
      .then((data)=>console.log(data))
      .catch((error)=> console.log(error)); 
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


  getUserProfile() {
    console.log("getUserProfile");

    this.userRegistration = this.db.object('/userRegistration/' + this.authState.uid, { preserveSnapshot: true });
    this.userRegistration.subscribe((data) => {
      this.userProfile = data.val();
      this.userType = data.val().type;
      console.log(this.userProfile);
    })

  }

  logoutFirebaseUser() {
    console.log("signout");
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

  get userProfileData(): Observable<any> {
    return this.userProfile.map((profile) => {
      return profile;
    });
  }

  getCurrentUserId(): Observable<any> {

    return this.afAuth.authState.map(authState => {
      return authState.uid;
    })

  }

  get uid(): any {
    return this.authState.uid;
  }

  get userTypeData(): Observable<any> {
    return this.userProfile.map((profile) => {
      return profile.type;
    });
  }

}
