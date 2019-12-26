import { Component, OnInit, NgModule } from "@angular/core";
import {
  trigger,
  state,
  transition,
  animate,
  style
} from "@angular/animations";
import { ActivatedRoute } from "@angular/router";
import { MatDialog, MatDialogRef, MatSnackBar } from "@angular/material";
import { Animations } from "../../../misc_assets/animations/animations";
import { HomepageService } from "src/app/service/homepage/homepage.service";
import { event } from "../../models/event";
import { workshop } from "../../models/workshop";
import { CartdialogComponent } from "src/app/components/cartdialog/cartdialog.component";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"],
  animations: [
    Animations.shiftContents,
    trigger("eventclick", [
      state("event", style({ borderColor: "green", borderWidth: "4px" })),
      state("workshop", style({ borderColor: "grey", borderWidth: "3px" })),
      transition("event=>workshop", animate("0.1s")),
      transition("workshop=>event", animate("0.1s"))
    ]),
    trigger("workshopclick", [
      state("workshop", style({ borderColor: "green", borderWidth: "4px" })),
      state("event", style({ borderColor: "grey", borderWidth: "3px" })),
      transition("event=>workshop", animate("0.1s")),
      transition("workshop=>event", animate("0.1s"))
    ])
  ]
})
export class HomepageComponent implements OnInit {
  eventData: any[];
  workshopData: any[];
  cartWorkshopData: any[];
  cartEventData: any[];
  data: any;
  student: any;
  studentData: any;
  studentAdmissionNumber: string;
  cartCount: number = 0;
  selectedDepartment: string;
  hasItemPresenceCalculated: boolean = false;
  loading: Boolean = true;
  constructor(
    private service: HomepageService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private cookie: CookieService,
    private snackbar: MatSnackBar
  ) {
    this.studentAdmissionNumber = this.cookie.get("username");
  }

  ngOnInit() {
    this.fetchStudentDetails();
    this.fetchEventDetails();
    this.fetchWorkshopDetails();
    this.fetchRegistrationDetails();
    this.loading = false;
  }
  fetchStudentDetails() {
    this.service.getStudent(this.studentAdmissionNumber).subscribe(res => {
      this.studentData = res;
      this.cookie.set("name", this.studentData.studentName);
      this.cookie.set("program", this.studentData.program);
    });
  }
  fetchEventDetails() {
    this.service.getEvents().subscribe(res => {
      this.eventData = res;
    });
  }
  fetchWorkshopDetails() {
    this.service.getWorkshops().subscribe(res => {
      this.workshopData = res;
    });
  }
  fetchRegistrationDetails() {
    this.service
      .getWorkshopRegisteredDetails(this.studentAdmissionNumber)
      .subscribe(res => {
        this.cartWorkshopData = res;
        this.cookie.set("workshopCart", JSON.stringify(this.cartWorkshopData));
        this.isWorkshopItemPresent();
      });
    this.service
      .getEventRegisteredDetails(this.studentAdmissionNumber)
      .subscribe(res => {
        this.cartEventData = res;
        this.cookie.set("eventCart", JSON.stringify(this.cartEventData));
        this.isEventItemPresent();
      });
  }
  isEventItemPresent() {
    for (let i = 0; i < this.eventData.length; i++) {
      var found = false;
      for (let j = 0; j < this.cartEventData.length; j++) {
        if (this.eventData[i].id === this.cartEventData[j].eventId) {
          this.eventData[i]["isPresent"] = true;
          this.eventData[i]["hasCheckedOut"] = this.cartEventData[j][
            "hasCheckedOut"
          ];
          if (
            this.eventData[i]["hasCheckedOut"] === false &&
            this.eventData[i].teamSize > 1
          ) {
            this.snackbar.open(
              "You have pending team requests, head over to your cart",
              "Close",
              {
                duration: 2500
              }
            );
          }
          // this.cartCount += 1;
          found = true;
          break;
        }
      }
      if (found === false) {
        this.eventData[i]["isPresent"] = false;
      }
    }
    this.hasItemPresenceCalculated = true;
  }
  isWorkshopItemPresent() {
    var found = false;
    for (let i = 0; i < this.workshopData.length; i++) {
      found = false;
      for (let j = 0; j < this.cartWorkshopData.length; j++) {
        if (this.workshopData[i].id === this.cartWorkshopData[j].workshopId) {
          this.workshopData[i]["isPresent"] = true;
          this.workshopData[i]["hasCheckedOut"] = this.cartWorkshopData[j][
            "hasCheckedOut"
          ];
          // this.cartCount += 1;
          found = true;
          break;
        }
      }
      if (found === false) {
        this.workshopData[i]["isPresent"] = false;
      }
    }
  }

  /*Animation state variable declaration*/
  navbarState = "";
  activeButton = "event";

  /*End of animation state variable declaration*/

  /*Function definitions to handle animation state variables*/
  receiveNavbarState($event) {
    this.navbarState = $event;
  }
  currentButton($event) {
    this.activeButton = $event.target.name;
    this.fetchRegistrationDetails();
  }
  /*End of function definitions to handle animation state variables*/
  changeCartCount($event) {
    this.cartCount += $event;
  }
  openCartDialog() {
    this.dialog.open(CartdialogComponent, {
      height: "500px",
      width: "500px",
      data: {
        eventCart: this.cartEventData,
        workshopData: this.cartWorkshopData
      }
    });
  }
}
