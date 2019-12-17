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

  ngOnInit() {
    this.myStyle = {
      position: "fixed",
      width: "100%",
      height: "100%",
      "z-index": -1,
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
