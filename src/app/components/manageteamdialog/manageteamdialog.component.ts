import { Component, OnInit, Inject, Output, EventEmitter } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { CookieService } from "ngx-cookie-service";
import { ManageteamdialogService } from "./manageteamdialog.service";
import { Animations } from "src/misc_assets/animations/animations";

@Component({
  selector: "app-manageteamdialog",
  templateUrl: "./manageteamdialog.component.html",
  styleUrls: ["./manageteamdialog.component.css"],
  animations: [Animations.fadeInOut]
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

  isThereDuplicate: Boolean = false;
  isThereNonExistentAdmissionNumber: Boolean = false;
  isThereEmptyField: Boolean = false;
  isThereIneligibleMember: Boolean = false;

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

  handleRequest() {
    this.membersAdmissionNumber.forEach(member => {
      if (member === "") {
        this.isThereEmptyField = true;
        return;
      }
    });
    if (!this.isThereEmptyField) {
      this.checkDuplicates();
    }
    this.postRequest();
  }
  checkDuplicates() {
    if (this.membersAdmissionNumber.length === 1) {
      if (this.membersAdmissionNumber[0] === this.currentUserAdmissionNumber) {
        this.isThereDuplicate = true;
        this.membersName = [];
        return;
      }
    }
    for (let i = 0; i < this.membersAdmissionNumber.length; i++) {
      if (
        this.membersAdmissionNumber[i] === this.currentUserAdmissionNumber ||
        this.membersAdmissionNumber[i + 1] === this.currentUserAdmissionNumber
      ) {
        this.isThereDuplicate = true;
        this.membersName = [];
        return;
      }
      for (let j = i + 1; j < this.membersAdmissionNumber.length; j++) {
        if (this.membersAdmissionNumber[i] === this.membersAdmissionNumber[j]) {
          this.isThereDuplicate = true;
          this.membersName = [];
          return;
        }
      }
    }
  }
  postRequest() {
    this.postAdmissionNumbers = [];
    this.postAdmissionNumbers.push(this.currentUserAdmissionNumber);

    if (!this.isThereEmptyField && !this.isThereDuplicate) {
      this.membersAdmissionNumber.forEach(member => {
        this.postAdmissionNumbers.push(member);
      });
      this.service
        .doStudentsExist(this.postAdmissionNumbers)
        .subscribe(data => {
          if (data.message === "Not found") {
            this.isThereNonExistentAdmissionNumber = true;
            this.membersName = [];
          } else {
            const members = data.members;
            this.membersSize = 1;
            for (let i = 1; i < members.length; i++) {
              this.membersName[i - 1] = members[i].studentName;

              this.membersSize += 1;
            }
            this.buttonStatus = "Request";
          }
        });
    }
  }
  requestMembers() {
    this.service
      .isInTeam(this.postAdmissionNumbers, this.data.teamEvent.eventId)
      .subscribe(data => {
        if (data.message === "Disallow") {
          this.isThereIneligibleMember = true;
        } else {
          this.service
            .createTeam(this.postAdmissionNumbers, this.data.teamEvent.eventId)
            .subscribe(data => {
              if (data.message === "Added") {
                this.buttonStatus = "Added";
              }
            });
        }
      });
  }
  resetStatus() {
    if (this.isThereEmptyField) {
      this.isThereEmptyField = !this.isThereEmptyField;
    }
    if (this.isThereDuplicate) {
      this.isThereDuplicate = !this.isThereDuplicate;
    }
    if (this.isThereNonExistentAdmissionNumber) {
      this.isThereNonExistentAdmissionNumber = !this
        .isThereNonExistentAdmissionNumber;
    }
    if (this.isThereIneligibleMember) {
      this.isThereIneligibleMember = !this.isThereIneligibleMember;
    }
    this.buttonStatus = "Check";
  }
}
