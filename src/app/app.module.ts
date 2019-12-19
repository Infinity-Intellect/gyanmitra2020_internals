import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./components/header/header.component";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatSidenavModule } from "@angular/material/sidenav";
import { LandingpageComponent } from "./views/landingpage/landingpage.component";
import { LoginpageComponent } from "./views/loginpage/loginpage.component";
import { FormsModule } from "@angular/forms";
import { HomepageComponent } from "./views/homepage/homepage.component";
import { SignuppageComponent } from "./views/signuppage/signuppage.component";
import { EntryheaderComponent } from "./components/entryheader/entryheader.component";
import { HttpClientModule } from "@angular/common/http";
import { DisplaycardComponent } from "./components/displaycard/displaycard.component";
import { HomepageService } from "./service/homepage/homepage.service";
import { AdminpageComponent } from "./views/adminpage/adminpage.component";
import {
  MatDialogModule,
  MatSnackBarModule,
  MatButtonModule
} from "@angular/material";
import { DescriptiondialogComponent } from "./components/descriptiondialog/descriptiondialog.component";
import { CartdialogComponent } from "./components/cartdialog/cartdialog.component";
import { LoginpageService } from "./service/loginpage/loginpage.service";
import { GradientbuttonComponent } from "./components/gradientbutton/gradientbutton.component";
import { AuthGuard } from "./auth.guard";
import { CookieService } from "ngx-cookie-service";
import { ParticlesModule } from "angular-particle";
import { ManageteamdialogComponent } from "./components/manageteamdialog/manageteamdialog.component";
import { AdminService } from "./service/admin/admin.service";
import { AttendanceButtonComponent } from "./components/attendance-button/attendance-button.component";
import { PaymentButtonComponent } from "./components/payment-button/payment-button.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingpageComponent,
    LoginpageComponent,
    HomepageComponent,
    SignuppageComponent,
    EntryheaderComponent,
    DisplaycardComponent,
    AdminpageComponent,
    DescriptiondialogComponent,
    CartdialogComponent,
    GradientbuttonComponent,
    ManageteamdialogComponent,
    AttendanceButtonComponent,
    PaymentButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    NgbModule,
    MatSidenavModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    ParticlesModule,
    MatSnackBarModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    HomepageService,
    LoginpageService,
    AuthGuard,
    CookieService,
    AdminService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DescriptiondialogComponent,
    CartdialogComponent,
    ManageteamdialogComponent
  ]
})
export class AppModule {}
