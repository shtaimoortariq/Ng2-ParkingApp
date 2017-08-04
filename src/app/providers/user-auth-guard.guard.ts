import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsersAuthService } from "./users-auth.service";
import { AngularFireAuth } from 'angularfire2/auth';
import "rxjs/add/operator/take";

@Injectable()


export class UserAuthGuardGuard implements CanActivate {

  constructor(private usersAuthService: UsersAuthService,
    private router: Router,
    private afAuth: AngularFireAuth) {

    console.log('UserAuthGuardGuard');
  }

  // canActivate(): Observable<any> {
  //   console.log('UserAuthGuardGuard');
  //   return this.afauth.authState.map((data) => {
  //     console.log("Andar");
  //     console.log(data.email);

  //     if (!data) {
  //       this.router.navigate(['/login']);
  //       return false;
  //     }

  //     // else if (data && data.email === 'admin@admin.com') {
  //     //   console.log(data.email);

  //     //   this.router.navigate(['/user/viewParking']);
  //     //   return true;
  //     // }

  //     else if (data && data.email !== 'admin@admin.com') {
  //       console.log(data.email);

  //       this.router.navigate(['/user/bookParking']);
  //       return data != null;
  //     }

  //     else {
  //       return false;
  //     }


  //   })
  // }



  canActivate() {
    // return this.afAuth.authState.map(authState => {
    //   if (!authState) this.router.navigate(['']);
    //   else if (authState.email != 'admin@admin.com') {this.router.navigate(['user/viewParking']); return authState != null; };
    // });
    return this.afAuth.authState.map(user => {
      if (user == null) {
        this.router.navigate(['/login']);
        return false;
      }
      
      else if (user != null && user.email != 'admin@admin.com') {
        console.log("else if");
        return true;
      }

      else {
        this.router.navigate(['admin']);
        return true;
      }
    }).take(1)
  }
}



// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
// import { AngularFireAuth } from 'angularfire2/auth';
// import 'rxjs/add/operator/map';

// @Injectable()

// export class AuthGuard implements CanActivate {
  
//   constructor(private afAuth: AngularFireAuth, private router: Router) {
//     console.log("AuthGuard Service");
//   }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
//   return this.afAuth.authState.map(user => {
//     if (!user) {
//       this.router.navigate(['/']);
//       return false;
//     } else {
//       return true;
//     }
//   });
// }
// }




