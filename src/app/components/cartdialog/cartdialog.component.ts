import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { CookieService } from "ngx-cookie-service";
import { CartService } from "../../service/cart/cart.service";
import { ManageteamdialogComponent } from "../manageteamdialog/manageteamdialog.component";
import { CartdialogService } from "./cartdialog.service";

@Component({
  selector: "app-cartdialog",
  templateUrl: "./cartdialog.component.html",
  styleUrls: ["./cartdialog.component.css"]
})
export class CartdialogComponent implements OnInit {
  user: String;
  arr: any[];
  admissionNumber: String;
  createTeamClicked: Boolean = false;
  constructor(
    private cookie: CookieService,
    private service: CartService,
    private dialog: MatDialog,
    private cartdialogservice: CartdialogService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = this.cookie.get("name");
    this.admissionNumber = this.cookie.get("username");
    this.arr = this.user.split(" ");
    this.user = this.arr.shift();
  }
  eventCart: any[];
  eventCartSize: Number;
  requestStatus: boolean = false;

  workshopCart: any[];
  workshopCartSize: Number;

  teamSizeArray: any[];

  ngOnInit() {
    this.service
      .getEventRegisteredDetails(this.admissionNumber)
      .subscribe(data => {
        this.eventCart = data;
        this.eventCartSize = this.eventCart.length;
      });
    this.service
      .getWorkshopRegisteredDetails(this.admissionNumber)
      .subscribe(data => {
        this.workshopCart = data;
        this.workshopCartSize = this.workshopCart.length;
      });
  }
  openTeamDialog() {
    this.dialog.open(ManageteamdialogComponent, {
      width: "500px",
      height: "500px"
    });
  }
  toggleTeamClicked(event) {
    this.dialog.open(ManageteamdialogComponent, {
      width: "700px",
      height: "500px",
      data: { teamEvent: event }
    });
    this.createTeamClicked = !this.createTeamClicked;
  }
  confirmEvent(evt) {
    this.cartdialogservice
      .confirmEvent(evt.admissionNumber, evt.eventId)
      .subscribe(receivedData => {
        console.log(receivedData);
      });

    evt.hasCheckedOut = true;
  }
  confirmWorkshop(workshop) {
    this.cartdialogservice
      .confirmWorkshop(workshop.admissionNumber, workshop.workshopId)
      .subscribe(receivedData => {
        console.log(receivedData);
      });

    workshop.hasCheckedOut = true;
  }
  assignRequestStatus(reqStatus) {
    this.requestStatus = reqStatus;
    console.log(reqStatus);
  }
}
