import { Component, OnInit } from '@angular/core';
import { UsersAuthService } from "../../providers/users-auth.service";
import { ActivatedRoute, Router } from '@angular/router';
import { SlotReservationService } from "../../providers/slot-reservation.service";

@Component({
  selector: 'app-book-parking',
  templateUrl: './book-parking.component.html',
  styleUrls: ['./book-parking.component.css']
})
export class BookParkingComponent implements OnInit {

  place;                                           //Airport
  selectedDate;                                    //date func
  time = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  duration = [1, 2, 3, 4, 5];                      // dummy 
  slots = ['slot 1', 'slot 2', 'slot 3', 'slot 4', 'slot 5', 'slot 6', 'slot 7', 'slot 8', 'slot 9', 'slot 10'];    // slots
  //'slot 11', 'slot 12', 'slot 13', 'slot 14', 'slot 15', 'slot 16','slot 17', 'slot 18', 'slot 19', 'slot 20'
  selectedTime;                                    // model
  selectedDuration;                                // model
  minDate = new Date();
  showSlotsFlag = false;
  usedSlots = [];




  constructor(private usersAuthService: UsersAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private slotReservationService: SlotReservationService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.place = params['index'];
      console.log(this.place);
      this.slotReservationService.checkForSlot(this.place);

    });
  }

  signout() {
    this.usersAuthService.logoutFirebaseUser();
  }

  showSlots() {

    this.showSlotsFlag = true;
    let tempUsedSlots = [];
    let alreadyReserved = [];
    this.slots = ['slot 1', 'slot 2', 'slot 3', 'slot 4', 'slot 5', 'slot 6', 'slot 7', 'slot 8', 'slot 9', 'slot 10'];    // slots
    this.usedSlots = [];
    console.log(this.selectedTime);
    console.log(this.selectedDuration);

    alreadyReserved = this.slotReservationService.algorithm(this.selectedDate, this.selectedTime, this.selectedDuration)
    console.log(alreadyReserved);
    for (let i = 0; i < alreadyReserved.length; ++i) {
      tempUsedSlots = this.slots.splice(alreadyReserved[i] - (i + 1), 1);
      this.usedSlots.push(tempUsedSlots);
      console.log(this.usedSlots);
    }


  }


  selectSlotForNewReservation(index) {



    // this.showSlotsFlag = true;
    // let alreadyReserved = [];
    // this.slots = ['slot 1', 'slot 2', 'slot 3', 'slot 4', 'slot 5', 'slot 6', 'slot 7', 'slot 8', 'slot 9', 'slot 10'];    // slots
    // this.usedSlots = [];
    // console.log(this.selectedTime);
    // console.log(this.selectedDuration);

    let slotNumber = this.slots[index];
    console.log(index);
    console.log(this.slots[index]);
    console.log(slotNumber[5]);
    this.slotReservationService.reserveNewSLot(this.selectedDate, this.selectedTime, this.selectedDuration, slotNumber[5], this.place);



    // console.log(alreadyReserved);
    // for (let i = 0; i < alreadyReserved.length; ++i) {
    //   this.usedSlots = this.slots.splice(alreadyReserved[i]-1, 1);
    //   console.log(this.usedSlots);
    // }
    // this.slotReservationService.getUserAllBooking().subscribe((data)=> {
    //   console.log(data);

    // })

    this.slotReservationService.viewUserReservations().subscribe((data) => {
      console.log(data);
      this.router.navigate(['user/viewBooking']);
    })
  }

}
