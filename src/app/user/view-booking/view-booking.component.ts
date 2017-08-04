import { Component, OnInit } from '@angular/core';
import { SlotReservationService } from '../../providers/slot-reservation.service'
import { AngularFireDatabase } from "angularfire2/database";
import { UsersAuthService } from "../../providers/users-auth.service";


@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {

  userAllBooking = [];
  userAllBookingKey = [];
  uid;

  constructor(private slotReservationService: SlotReservationService,
    private db: AngularFireDatabase,
    private usersAuthService: UsersAuthService
  ) {

  }



  ngOnInit() {

    this.usersAuthService.getCurrentUserId().subscribe((data) => {
      console.log(data);
      this.uid = data;
    })

    this.slotReservationService.viewUserReservations().subscribe((data) => {
      this.userAllBooking = data;
      this.userAllBookingKey = this.slotReservationService.getAllUsersKey;
    })
  }

  cancel(booking, index) {
    console.log(this.userAllBookingKey);
    console.log('booking/' + this.uid + '/' + booking.place + '/' + this.userAllBookingKey[index]);

    this.db.list('booking/' + this.uid + '/' + booking.place + '/').remove(this.userAllBookingKey[index]);


  }

}
