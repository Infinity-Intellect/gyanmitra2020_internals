import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { CookieService } from "ngx-cookie-service";
import { CartService } from "../../service/cart/cart.service";
import { ManageteamdialogComponent } from "../manageteamdialog/manageteamdialog.component";

@Component({
  selector: "app-cartdialog",
  templateUrl: "./cartdialog.component.html",
  styleUrls: ["./cartdialog.component.css"]
})
export class CartdialogComponent implements OnInit {
  user: String;
  arr: any[];
  admissionNumber: String;
  constructor(
    private cookie: CookieService,
    private service: CartService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = this.cookie.get("name");
    this.admissionNumber = this.cookie.get("username");
    this.arr = this.user.split(" ");
    this.user = this.arr.shift();
  }
  eventCart: any[];
  workshopCart: any[];
  ngOnInit() {
    this.service
      .getEventRegisteredDetails(this.admissionNumber)
      .subscribe(data => {
        this.eventCart = data;
      });
    this.service
      .getWorkshopRegisteredDetails(this.admissionNumber)
      .subscribe(data => {
        this.workshopCart = data;
      });
  }
  openTeamDialog() {
    this.dialog.open(ManageteamdialogComponent, {
      width: "500px",
      height: "500px"
    });
  }
}
