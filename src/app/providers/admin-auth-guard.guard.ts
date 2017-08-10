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
    return this.afAuth.authState.map(user => {

      if (user == null) {
        this.router.navigate(['login']);
        return false;
      }
      else if (user != null && user.email == 'admin@admin.com') {
        console.log("true");
        //this.router.navigate(['admin/viewAllBookings']);
        return true;
      }

      else {
        this.router.navigate(['user']);
        return true;
      }
    })
  }
}

