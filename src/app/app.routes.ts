import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

//USER ROUTES
import { UserComponent } from "./user/user.component";
import { ViewPakingComponent } from "./user/view-paking/view-paking.component";
import { BookParkingComponent } from "./user/book-parking/book-parking.component";
import { ViewBookingComponent } from "./user/view-booking/view-booking.component";
import { FeedbackComponent } from "./user/feedback/feedback.component";

//USER AUTH GUARDS
import { UserAuthGuardGuard } from "./providers/user-auth-guard.guard";
import { AdminAuthGuardGuard } from "./providers/admin-auth-guard.guard";

//ADMIN ROUTES
import { AdminComponent } from "./admin/admin.component";
import { ViewFeedBackComponent } from "./admin/view-feed-back/view-feed-back.component";
import { ViewUsersComponent } from "./admin/view-users/view-users.component";
import { ViewAllBookingsComponent } from "./admin/view-all-bookings/view-all-bookings.component";




const routes: Routes = [
    { path: '', canActivate: [UserAuthGuardGuard, AdminAuthGuardGuard], component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    {
        path: 'user',canActivate: [UserAuthGuardGuard], component: UserComponent, children: [
            { path: 'viewParking', component: ViewPakingComponent },
            { path: 'bookParking/:index', component: BookParkingComponent },
            { path: 'viewBooking', component: ViewBookingComponent },
            { path: 'feedBack', component: FeedbackComponent },
        ]
    },

    {
        path: 'admin', canActivate: [AdminAuthGuardGuard], component: AdminComponent, children: [
            { path: 'viewAllBookings/:uid', component: ViewAllBookingsComponent },
            { path: 'viewUsers', component:ViewUsersComponent },
            { path: 'viewFeedBack', component: ViewFeedBackComponent },

        ]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }