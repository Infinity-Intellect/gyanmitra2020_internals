import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./components/header/header.component";

import { MatToolbarModule } from "@angular/material/toolbar";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatSidenavModule } from "@angular/material/sidenav";
import { LandingpageComponent } from "./views/landingpage/landingpage.component";
import { LoginpageComponent } from "./views/loginpage/loginpage.component";
import { FormsModule } from "@angular/forms";
import { HomepageComponent } from "./views/homepage/homepage.component";
import { SignuppageComponent } from "./views/signuppage/signuppage.component";
import { EntryheaderComponent } from "./components/entryheader/entryheader.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingpageComponent,
    LoginpageComponent,
    HomepageComponent,
    SignuppageComponent,
    EntryheaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    NgbModule,
    MatSidenavModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
