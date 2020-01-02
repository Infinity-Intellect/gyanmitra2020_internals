import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { CookieService } from "ngx-cookie-service";
import { CartService } from "../../service/cart/cart.service";
import { ManageteamdialogComponent } from "../manageteamdialog/manageteamdialog.component";
import { CartdialogService } from "./cartdialog.service";
import { ViewteamdialogComponent } from "../viewteamdialog/viewteamdialog.component";

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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cartdialogref: MatDialogRef<CartdialogComponent>
  ) {
    this.user = this.cookie.get("name");
    this.admissionNumber = this.cookie.get("username");
    this.arr = this.user.split(" ");
    this.user = this.arr.shift();
  }

  /**Required variables declaration */
  eventCart: any[];
  eventCartSize: Number;

  workshopCart: any[];
  workshopCartSize: Number;

  teamSizeArray: any[];

  hasTeamBeenCreated: Boolean = false;

  /**End of required variables declartion */

  ngOnInit() {
    /**Get details of all registered events by student */
    this.service
      .getEventRegisteredDetails(this.admissionNumber)
      .subscribe(data => {
        this.eventCart = data;
        this.eventCartSize = this.eventCart.length;
        /**Check if team request has been sent (to toggle 'create' and 'view' team) */
        this.hasRequestedTeam();
      });
    /**Get details of all registerd workshops by student */
    this.service
      .getWorkshopRegisteredDetails(this.admissionNumber)
      .subscribe(data => {
        this.workshopCart = data;
        this.workshopCartSize = this.workshopCart.length;
      });
  }

  /**Check if team request has been sent (to toggle 'create' and 'view' team) */
  hasRequestedTeam() {
    this.eventCart.forEach(event => {
      if (event.teamSize > 1) {
        this.service
          .doesTeamExist(this.admissionNumber, event.eventId)
          .subscribe(data => {
            if (data.message === "Yes") {
              event.isInTeam = "Yes";
            }
          });
      }
    });
  }

  /**When 'create team+' is clicked, this dialog box opens, allowing users to choose team members */
  openManageTeamDialog(event) {
    const dialogref = this.dialog.open(ManageteamdialogComponent, {
      width: "700px",
      height: "500px",
      data: { teamEvent: event }
    });
    dialogref.afterClosed().subscribe(data => {
      this.cartdialogref.close();
    });
  }

  /**When 'view team' is clicked, this dialog box opens, allowing users to view team status */
  openViewTeamDialog(event) {
    const dialogref = this.dialog.open(ViewteamdialogComponent, {
      width: "500px",
      height: "500px",
      data: { teamEvent: event, admissionNumber: this.admissionNumber }
    });
  }

  /**Change participation status to confirmed for said event */
  confirmEvent(evt) {
    this.cartdialogservice
      .confirmEvent(evt.admissionNumber, evt.eventId)
      .subscribe(receivedData => {
        console.log(receivedData);
      });

    evt.hasCheckedOut = true;
  }

  /**Change participation status to confirmed for said workshop*/
  confirmWorkshop(workshop) {
    this.cartdialogservice
      .confirmWorkshop(workshop.admissionNumber, workshop.workshopId)
      .subscribe(receivedData => {
        console.log(receivedData);
      });

    workshop.hasCheckedOut = true;
  }
}
