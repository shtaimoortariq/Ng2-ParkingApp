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

  
  canActivate() {
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
