import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { ViewteamdialogService } from "./viewteamdialog.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-viewteamdialog",
  templateUrl: "./viewteamdialog.component.html",
  styleUrls: ["./viewteamdialog.component.css"]
})
export class ViewteamdialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ViewteamdialogService,
    private cookie: CookieService
  ) {}

  /**Required variables declaration */

  teamEventDetails = this.data.teamEvent;
  eventId = this.teamEventDetails.eventId;
  teamMembersDetails: any;
  currentUserAdmissionNumber = this.cookie.get("username");
  teamStatus: boolean = false;
  teamLeader: String;

  /**End of required variables declaration */

  ngOnInit() {
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
}
