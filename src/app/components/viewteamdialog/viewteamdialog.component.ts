import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { ViewteamdialogService } from "./viewteamdialog.service";
import { CookieService } from "ngx-cookie-service";
import { CartdialogService } from "../cartdialog/cartdialog.service";

@Component({
  selector: "app-viewteamdialog",
  templateUrl: "./viewteamdialog.component.html",
  styleUrls: ["./viewteamdialog.component.css"]
})
export class ViewteamdialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ViewteamdialogService,
    private cookie: CookieService,
    private cartservice: CartdialogService
  ) {}

  /**Required variables declaration */

  teamEventDetails = this.data.teamEvent;
  eventId = this.teamEventDetails.eventId;
  teamMembersDetails: any;
  currentUserAdmissionNumber = this.cookie.get("username");
  teamStatus: boolean = false;
  teamLeader: String;
  haveAllMembersCheckedOut: Boolean = false;

  /**End of required variables declaration */

  ngOnInit() {
    if (this.teamEventDetails.hasCheckedOut) {
      this.haveAllMembersCheckedOut = true;
    }

    this.service
      .getTeamDetails(this.currentUserAdmissionNumber, this.eventId)
      .subscribe(data => {
        this.teamMembersDetails = data;
        this.teamStatus = this.returnTeamStatus();
        this.teamLeader = this.getTeamLeader();
      });
  }

  getTeamLeader() {
    var admissionNumber = "";
    this.teamMembersDetails.forEach(member => {
      if (member.addedBy === "self") {
        admissionNumber = member.admissionNumber;
      }
    });
    return admissionNumber;
  }
  returnTeamStatus() {
    const size = this.teamMembersDetails.length;
    var count = 0;
    this.teamMembersDetails.forEach(member => {
      if (member.hasConfirmed) {
        count += 1;
      }
    });
    if (count === size) {
      return true;
    } else {
      return false;
    }
  }
  confirmParticipation(member) {
    this.service
      .confirmParticipation(member.admissionNumber, this.eventId)
      .subscribe(receivedData => {
        if (receivedData.nModified === 1) {
          member.hasConfirmed = true;
        }
      });
  }
  confirmTeamParticipation() {
    var size = 0;
    this.teamMembersDetails.forEach(member => {
      this.cartservice
        .confirmEvent(member.admissionNumber, this.eventId)
        .subscribe(data => {
          console.log(data);
          if (data.nModified === 1) {
            size += 1;
            if (size === this.teamMembersDetails.length) {
              this.haveAllMembersCheckedOut = true;
            }
          }
        });
    });
  }
}
