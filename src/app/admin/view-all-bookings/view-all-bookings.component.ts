import { Component, OnInit } from '@angular/core';
import { SlotReservationService } from "../../providers/slot-reservation.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFireDatabase } from "angularfire2/database";


@Component({
  selector: 'app-view-all-bookings',
  templateUrl: './view-all-bookings.component.html',
  styleUrls: ['./view-all-bookings.component.css']
})
export class ViewAllBookingsComponent implements OnInit {


  currentBooking = [];
  currentBookingKey = [];
  uid;

  constructor(private slotReservationService: SlotReservationService,
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase) {

  }

  ngOnInit() {
    //this.currentBooking = this.slotReservationService.currentUserBooking();
    this.currentBookingKey = this.slotReservationService.currentUserBookingKey;


    console.log(this.currentBooking);
    console.log(this.currentBookingKey);

    this.route.params.subscribe(params => {
      this.uid = params['uid'];
      console.log(this.uid);


      this.slotReservationService.viewCompleteUserReservation(this.uid).subscribe((data) => {
        //this.router.navigate(['/admin/viewAllBookings', this.allUsersKey[index]]);
        this.currentBooking = data;
      });

    });

  }


  cancel(booking, index) {
    console.log(booking.place);
    this.db.list('booking/' + this.uid + '/' + booking.place + '/').remove(this.currentBookingKey[index]);

  }

}
