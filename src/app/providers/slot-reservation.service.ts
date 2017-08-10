import { Injectable } from '@angular/core';
import { UsersAuthService } from "./users-auth.service";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import { Observable } from 'rxjs/Observable'

@Injectable()
export class SlotReservationService {


    booking: FirebaseListObservable<any>;
    newBooking: FirebaseListObservable<any>;
    allCurrentUserBooking: FirebaseListObservable<any>;
    viewCompleteUserBooking: FirebaseListObservable<any>;
    uid;
    reservedSlots = [];
    blockSlots = [];
    userAllBooking = [];
    userAllBookingKey = [];
    currentUserAllBooking = [];
    currentUserAllBookingKey = [];
    adminCancelBookingUid;

    constructor(private usersAuthService: UsersAuthService,
        private db: AngularFireDatabase) {

        console.log("SlotReservationService");
        //this.uid = usersAuthService.uid;

        usersAuthService.getCurrentUserId().subscribe((uid) => {
            this.uid = uid;
        })
    }



    checkForSlot(place) {

        this.usersAuthService.getCurrentUserId().subscribe((data) => {
            console.log(data);
            this.uid = data;
        })

        this.booking = this.db.list('booking/', { preserveSnapshot: true })
        this.booking.subscribe(uid => {
            this.reservedSlots = [];
            uid.forEach(places => {
                console.log(places.key)
                console.log(places.val())
                places.forEach(slotData => {
                    console.log(slotData.key);
                    console.log(slotData.val());
                    if (slotData.key == place) {
                        console.log(place);
                        slotData.forEach((data) => {
                            this.reservedSlots.push(data.val());
                            console.log(data.val());

                        })
                    }
                });
            });
        });

    }


    algorithm(date, time, currentDuration): any {
        this.blockSlots = [];
        let currentStartTime = parseInt(time);
        let currentEndTime = currentStartTime + currentDuration;
        let ndate = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        month++;

        let currentDate = ndate + '/' + month + '/' + year;

        console.log(currentDate);
        console.log(date);
        console.log(currentStartTime);
        console.log(currentEndTime);
        console.log(currentDuration);

        console.log(date); console.log(time); console.log(currentDuration); console.log(currentStartTime); console.log(currentEndTime); console.log(currentDate);

        console.log(this.reservedSlots);

        for (let i = 0; i < this.reservedSlots.length; ++i) {
            console.log(this.reservedSlots[i].reserveDate)
            if (this.reservedSlots[i].reserveDate == currentDate) {
                console.log("Date is mateched with selecected date");
                if (((currentEndTime > this.reservedSlots[i].startTime) && (currentStartTime < this.reservedSlots[i].endTime))
                    || ((currentEndTime <= this.reservedSlots[i].endTime) && (currentEndTime > this.reservedSlots[i].startTime))) {
                    console.log("This slot is not avalible " + this.reservedSlots[i].slotNo);
                    this.blockSlots.push(this.reservedSlots[i].slotNo);

                }
                else if (currentStartTime < this.reservedSlots[i].startTime && currentEndTime > this.reservedSlots[i].endTime) {
                    console.log("This slot is not avalible " + this.reservedSlots[i].slotNo);
                    this.blockSlots.push(this.reservedSlots[i].slotNo);
                }
            }


            if (i == this.reservedSlots.length - 1) {
                return this.blockSlots;
            }
        }

    }


    reserveNewSLot(date, time, currentDuration, currentSlott, place) {
        console.log(date); console.log(time); console.log(currentDuration); console.log(currentSlott);

        let currentStartTime = parseInt(time);
        let currentEndTime = currentStartTime + currentDuration;
        let currentSlot = parseInt(currentSlott);
        let ndate = date.getDate();
        let month = date.getMonth();
        month++;
        let year = date.getFullYear();
        let currentDate = ndate + '/' + month + '/' + year;

        this.newBooking = this.db.list('booking/' + this.uid + '/' + place, { preserveSnapshot: true })
        this.newBooking.push({
            duration: currentDuration,
            endTime: currentEndTime,
            reserveDate: currentDate,
            slotNo: currentSlot,
            startTime: currentStartTime,
            place: place
        })

    }


    viewUserReservations(): Observable<any> {
        // this.allCurrentUserBooking = this.db.list('booking/' + this.uid + '/', { preserveSnapshot: true })
        // this.allCurrentUserBooking.subscribe(uid => {
        //     console.log("Subscribe");

        //     this.userAllBooking = [];
        //     uid.forEach(places => {
        //         console.log(places.key)
        //         console.log(places.val())
        //         places.forEach(slotData => {
        //             console.log(slotData.key);
        //             console.log(slotData.val());
        //             slotData.forEach((data) => {
        //                 this.userAllBooking.push(data.val());
        //                 console.log(data.val());
        //             })
        //         });
        //     });
        //     console.log(this.userAllBooking);

        // });

        this.allCurrentUserBooking = this.db.list('booking/' + this.uid, { preserveSnapshot: true })
        return this.allCurrentUserBooking.map(uid => {
            console.log("subscribe");
            this.userAllBooking = [];
            this.userAllBookingKey = [];
            uid.forEach(places => {
                console.log(places.key)
                console.log(places.val())
                places.forEach(slotData => {
                    console.log(slotData.key);
                    console.log(slotData.val());
                    this.userAllBookingKey.push(slotData.key);
                    this.userAllBooking.push(slotData.val());
                });
            });
            return this.userAllBooking;

        });


    }

    viewCompleteUserReservation(specificUid) {
        this.viewCompleteUserBooking = this.db.list('booking/' + specificUid, { preserveSnapshot: true })
        console.log("ViewCompleteUserReservation");

        return this.viewCompleteUserBooking.map(uid => {
            console.log("subscribe from viewComplete");
            this.currentUserAllBooking = [];
            this.currentUserAllBookingKey = [];

            uid.forEach(places => {
                console.log(places.key)
                console.log(places.val())
                places.forEach(slotData => {
                    console.log(slotData.key);
                    console.log(slotData.val());
                    this.currentUserAllBookingKey.push(slotData.key);
                    this.currentUserAllBooking.push(slotData.val());
                });
            });
            return this.currentUserAllBooking;

        });
    }


    currentUserBooking() {
        return this.currentUserAllBooking;
    }

    get currentUserBookingKey(): any {
        return this.currentUserAllBookingKey;
    }


    get getAllUsersKey(): any {
        return this.userAllBookingKey;
    }

    // setCancelBookingUser(bookingUid) {


    //     this.adminCancelBookingUid = bookingUid;
    //     console.log(this.adminCancelBookingUid);
    //     console.log(bookingUid);

    // }

    // getUserAllBooking(): Observable<any> {
    //     return this.allCurrentUserBooking.map((data) => {
    //         return data;
    //     })
    // }
}


// this.pushobj = this.db.list('/bookings/', { preserveSnapshot: true });
//     return this.pushobj.map(slot => {
//       // console.log(slot);
//       return slot