import { Component, OnInit } from '@angular/core';
import { UsersAuthService } from "../../providers/users-auth.service";
import { SlotReservationService } from "../../providers/slot-reservation.service";
import { Router } from "@angular/router";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  allUsers = [];
  allUsersKey = [];

  constructor(private usersAuthService: UsersAuthService,
    private slotReservationService: SlotReservationService,
    private router: Router,
    private db: AngularFireDatabase) { }

  ngOnInit() {

    this.usersAuthService.getAllUsers().subscribe((data) => {
      this.allUsers = data;
      this.allUsersKey = this.usersAuthService.getAllUsersKey;
      console.log(this.allUsersKey);
    })

  }

  viewUserBookings(index) {

    this.slotReservationService.viewCompleteUserReservation(this.allUsersKey[index]).subscribe((data) => {
      this.router.navigate(['/admin/viewAllBookings', this.allUsersKey[index]]);
    });

  }


  deleteUser(index) {
    // this.db.list('userRegistration/').remove(this.allUsersKey[index]).then((data) => {
    //   this.db.list('chat/').remove(this.allUsersKey[index]).then((data) => {
    //     this.db.list('booking/').remove(this.allUsersKey[index]);
    //   });
    // });

    console.log(this.allUsersKey[index]);

    this.db.object('chat/' + this.allUsersKey[index]).remove();
    this.db.object('booking/' + this.allUsersKey[index]).remove();
    this.db.object('userRegistration/' + this.allUsersKey[index]).remove();

  }
}
