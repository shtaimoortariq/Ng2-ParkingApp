import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


//Material Design 
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdInputModule, MdToolbarModule, MdListModule,
   MdCardModule, MdDatepickerModule, MdNativeDateModule, MdSelectModule } from '@angular/material';
import 'hammerjs';


//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { ViewPakingComponent } from './user/view-paking/view-paking.component';
import { BookParkingComponent } from './user/book-parking/book-parking.component';
import { ViewBookingComponent } from './user/view-booking/view-booking.component';
import { FeedbackComponent } from './user/feedback/feedback.component';


//Routing
import { AppRoutingModule } from './app.routes';


//Providers
import { UsersAuthService } from "./providers/users-auth.service";
import { SlotReservationService } from "./providers/slot-reservation.service";

//Auth Guards
import { UserAuthGuardGuard } from "./providers/user-auth-guard.guard";
import { AdminAuthGuardGuard } from "./providers/admin-auth-guard.guard";

//AngularFire
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AdminComponent } from './admin/admin.component';
import { ViewUsersComponent } from './admin/view-users/view-users.component';
import { ViewFeedBackComponent } from './admin/view-feed-back/view-feed-back.component';
import { ViewAllBookingsComponent } from './admin/view-all-bookings/view-all-bookings.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    UserComponent,
    ViewPakingComponent,
    BookParkingComponent,
    ViewBookingComponent,
    FeedbackComponent,
    AdminComponent,
    ViewUsersComponent,
    ViewFeedBackComponent,
    ViewAllBookingsComponent
  ],
  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    //Forms
    FormsModule,
    ReactiveFormsModule,

    //Material
    NoopAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdToolbarModule,
    MdListModule,
    MdCardModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdSelectModule,

    //Routes
    AppRoutingModule,

    //AngularFire
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [UsersAuthService, UserAuthGuardGuard, AdminAuthGuardGuard, SlotReservationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
