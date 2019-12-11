import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { LandingpageComponent } from "./views/landingpage/landingpage.component";
import { LoginpageComponent } from "./views/loginpage/loginpage.component";
import { HomepageComponent } from "./views/homepage/homepage.component";
import { SignuppageComponent } from "./views/signuppage/signuppage.component";
import { AdminpageComponent } from "./views/adminpage/adminpage.component";

const routes: Routes = [
  { path: "", component: LandingpageComponent },
  { path: "login", component: LoginpageComponent },
  { path: "home", component: HomepageComponent },
  { path: "signup", component: SignuppageComponent },
  { path: "admin", component: AdminpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
