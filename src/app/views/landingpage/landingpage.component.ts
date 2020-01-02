import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { ParticlesModule } from "angular-particle";

@Component({
  selector: "app-landingpage",
  templateUrl: "./landingpage.component.html",
  styleUrls: ["./landingpage.component.css"]
})
export class LandingpageComponent implements OnInit {
  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;

  constructor(private cookie: CookieService) {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("userLoggedIn");
  }

  remainingTime;
  remainingDays: any = 0;
  remainingHours: any = 0;
  remainingMinutes: any = 0;
  remainingSeconds: any = 0;
  countDownTimer(countDownDate) {
    this.remainingTime = countDownDate.getTime() - new Date().getTime();
    this.remainingDays = Math.floor(this.remainingTime / (1000 * 60 * 60 * 24));
    this.remainingSeconds = Math.floor(
      (this.remainingTime % (1000 * 60)) / 1000
    );
    console.log(this.remainingDays + ":" + this.remainingSeconds);
  }
  ngOnInit() {
    let countDownDate = new Date("Jan 24, 2020 00:00:00");
    let interval = setInterval(this.countDownTimer, 1000, countDownDate);
    this.myStyle = {
      position: "fixed",
      width: "100%",
      height: "100%",
      "z-index": 1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    };
    this.myParams = {
      particles: {
        number: {
          value: 200
        },
        color: {
          value: "#ff0000"
        },
        shape: {
          type: "triangle"
        }
      }
    };

    this.cookie.deleteAll();
    localStorage.removeItem("loggedIn");
  }
}
