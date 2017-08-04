import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-view-paking',
  templateUrl: './view-paking.component.html',
  styleUrls: ['./view-paking.component.css']
})
export class ViewPakingComponent implements OnInit {

  constructor(private router: Router) { }

  allPlaces = ['Airport', 'Sea View', 'Regal Market'];
  bookParkingFlag = false;


  ngOnInit() {
  }

  setParkingPlace(index) {
      console.log(index);
      this.router.navigate(['user/bookParking' ,index]);
  }


}
