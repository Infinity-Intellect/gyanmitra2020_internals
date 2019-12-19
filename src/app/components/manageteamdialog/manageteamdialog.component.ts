import { Component, OnInit, Inject, Output, EventEmitter } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { CookieService } from "ngx-cookie-service";
import { ManageteamdialogService } from "./manageteamdialog.service";

@Component({
  selector: "app-manageteamdialog",
  templateUrl: "./manageteamdialog.component.html",
  styleUrls: ["./manageteamdialog.component.css"]
})
export class ManageteamdialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cookie: CookieService,
    private service: ManageteamdialogService
  ) {}

  buttonStatus: String = "Check";

  currentUserAdmissionNumber = this.cookie.get("username");
  currentUserName = this.cookie.get("name");

  teamSizeArray: any[];
  membersAdmissionNumber: any[];
  postAdmissionNumbers: any[] = [];

  membersName: any[];
  membersSize: any = 0;

  isThereNonExistentAdmissionNumber: Boolean = false;

  matchingFieldFound: Boolean = false;

  hasRequested: Boolean = false;

  ngOnInit() {
    this.teamSizeArray = Array(this.data.teamEvent.teamSize - 1)
      .fill(this.data.teamSize - 1)
      .map((x, i) => i + 2);

    this.membersAdmissionNumber = Array(this.data.teamEvent.teamSize - 1).fill(
      ""
    );
    this.membersName = Array(this.data.teamEvent.teamSize - 1).fill("");
    this.postAdmissionNumbers.push(this.currentUserAdmissionNumber);
  }

  async handleRequest() {
    for (let i = 0; i < this.membersAdmissionNumber.length - 1; i++) {
      if (
        this.membersAdmissionNumber[i] === this.currentUserAdmissionNumber ||
        this.membersAdmissionNumber[i + 1] === this.currentUserAdmissionNumber
      ) {
        this.matchingFieldFound = true;
        break;
      }
      for (let j = i + 1; j < this.membersAdmissionNumber.length; j++) {
        if (this.membersAdmissionNumber[j] === this.membersAdmissionNumber[i]) {
          this.matchingFieldFound = true;
          break;
        }
      }
    }
    if (!this.matchingFieldFound) {
      this.membersSize = 0;
      this.postAdmissionNumbers = [];
      this.postAdmissionNumbers.push(this.currentUserAdmissionNumber);
      for (let i = 0; i < this.membersAdmissionNumber.length; i++) {
        await this.doesStudentExist(this.membersAdmissionNumber[i], i);
      }
      //while (this.membersSize !== this.data.teamEvent.teamSize);
      console.log(this.data.teamEvent.eventId);

      console.log(this.postAdmissionNumbers.length);

      console.log(this.data.teamEvent.teamSize);

      /**Call Service */
      // this.service.createTeam(
      //   this.membersAdmissionNumber,
      //   this.data.teamEvent.eventId
      // );
      //this.hasRequested = true;
    }
  }
  resetStatus() {
    this.buttonStatus = "Check";

    if (this.matchingFieldFound) {
      this.matchingFieldFound = !this.matchingFieldFound;
    }
    if (this.isThereNonExistentAdmissionNumber) {
      this.isThereNonExistentAdmissionNumber = !this
        .isThereNonExistentAdmissionNumber;
    }
  }

  doesStudentExist(admissionNumber, i) {
    this.service.isStudentPresent(admissionNumber).subscribe(receivedData => {
      if (receivedData.message === "Not Found") {
        this.isThereNonExistentAdmissionNumber = true;
        return;
      } else {
        this.postAdmissionNumbers.push(admissionNumber);
      }
      //console.log(receivedData);
      this.membersName[i] = receivedData.student.studentName;
      this.membersSize += 1;
      console.log(this.membersSize);

      if (this.membersSize === this.data.teamEvent.teamSize - 1) {
        this.buttonStatus = "Request";
      }
    });
  }

  postRequest() {
    console.log(this.postAdmissionNumbers);
    console.log("Posting ...");
  }
}
