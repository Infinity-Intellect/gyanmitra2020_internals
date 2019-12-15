import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Animations } from "../../../misc_assets/animations/animations";
import { url } from "../../../url";
import { LoginpageService } from "../../service/loginpage/loginpage.service";
import { trigger, transition, style, animate } from "@angular/animations";
import { AuthService } from "src/app/auth.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-loginpage",
  templateUrl: "./loginpage.component.html",
  styleUrls: ["./loginpage.component.css"],
  animations: [Animations.swoopIn, Animations.fadeInOut]
})
export class LoginpageComponent implements OnInit {
  constructor(
    private router: Router,
    private service: LoginpageService,
    private authservice: AuthService,
    private cookie: CookieService
  ) {}
  admissionNumber: string;
  password: string;
  incorrectInputData: boolean = false;

  emptyField: boolean = false;

  ngOnInit() {}
  routeToHomePage = () => {
    if (!this.admissionNumber || !this.password) {
      this.emptyField = true;
    } else {
      this.service
        .getStudentPresent(this.admissionNumber, this.password)
        .subscribe(data => {
          if (data.admissionNumber !== -1) {
            this.authservice.setLoggedIn(true);
            this.setCookies(data);
            this.router.navigateByUrl("/home");
          } else {
            this.incorrectInputData = true;
          }
        });
    }
  };
  setCookies(data) {
    this.cookie.set("admissionNumber", data.admissionNumber);
    this.cookie.set("name", data.name);
    this.cookie.set("department", data.program);
  }
  alterEmptyFieldState = () => {
    this.emptyField = false;
    this.incorrectInputData = false;
  };
}
