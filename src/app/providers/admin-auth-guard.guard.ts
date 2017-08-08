import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AdminAuthGuardGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth,
    private router: Router) {
    console.log('Admin Guard');

  }



  canActivate() {
    // return this.afAuth.authState.map(authState => {
    //   if (!authState) this.router.navigate(['']);
    //   else if (authState.email != 'admin@admin.com') {this.router.navigate(['user/viewParking']); return authState != null; };
    // });
    return this.afAuth.authState.map(user => {
      if (user != null && user.email == 'admin@admin.com') {
        console.log("true");
        //this.router.navigate(['admin/viewAllBookings']);
        return true;
      }

      else {
        this.router.navigate(['/login']);
        return false;
      }
    })
  }
}

