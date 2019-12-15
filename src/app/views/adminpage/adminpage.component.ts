import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-adminpage",
  templateUrl: "./adminpage.component.html",
  styleUrls: ["./adminpage.component.css"]
})
export class AdminpageComponent implements OnInit {
  adminData: any;
  constructor(private cookie: CookieService) {
    this.adminData = { name: this.cookie.get("name") };
  }

  ngOnInit() {}
}
