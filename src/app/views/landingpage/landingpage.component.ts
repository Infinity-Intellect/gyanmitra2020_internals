import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-landingpage",
  templateUrl: "./landingpage.component.html",
  styleUrls: ["./landingpage.component.css"]
})
export class LandingpageComponent implements OnInit {
  constructor(private cookie: CookieService) {}

  ngOnInit() {
    this.cookie.deleteAll();
    localStorage.removeItem("loggedIn");
  }
}
