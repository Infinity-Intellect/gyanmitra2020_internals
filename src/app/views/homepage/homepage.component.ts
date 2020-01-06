import { Component, OnInit, NgModule } from "@angular/core";
import {
  trigger,
  state,
  transition,
  animate,
  style
} from "@angular/animations";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog, MatDialogRef, MatSnackBar } from "@angular/material";
import { Animations } from "../../../misc_assets/animations/animations";
import { HomepageService } from "src/app/service/homepage/homepage.service";
import { CartdialogComponent } from "src/app/components/cartdialog/cartdialog.component";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"],
  animations: [
    Animations.shiftContents,
    Animations.blink,
    Animations.fadeInOut,
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
  eventData: any[] = [];
  workshopData: any[] = [];
  filteredEventData: any[] = [];
  filteredWorkshopData: any[] = [];
  cartWorkshopData: any[] = [];
  cartEventData: any[] = [];

  data: any;
  student: any;
  studentData: any;
  studentAdmissionNumber: string;
  cartCount: number = 0;
  selectedDepartment: string = "All";
  hasEventItemPresenceCalculated: boolean = false;
  hasWorkshopItemPresenceCalculated: boolean = false;
  loading: Boolean = true;
  searchText: String = "";
  hasProcessed: Boolean = false;

  workshopItem: any;

  color = "primary";
  mode = "indeterminate";

  confetti(args: any) {
    return window["confetti"].apply(this, arguments);
  }

  constructor(
    private service: HomepageService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private cookie: CookieService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.studentAdmissionNumber = this.cookie.get("username");
  }
  confettiAnimation() {
    let date = Date.now();
    this.confetti({
      angle: 180,
      spread: 1000,
      particleCount: 700,
      origin: {
        x: 0.5,
        y: 0.5
      }
    });
  }
  fireConfettiOnClick(event: any) {
    this.confetti({
      angle: 180,
      spread: 100,
      particleCount: 100,
      origin: {
        x: 0.5,
        y: 0.5
      }
    });
  }

  ngOnInit() {
    this.confettiAnimation();
    this.hasProcessed = false;
    this.loading = true;
    this.fetchStudentDetails();
    this.fetchEventDetails();
    this.fetchWorkshopDetails();
    this.fetchRegistrationDetails();
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
        this.filterData();
      });
    this.service
      .getEventRegisteredDetails(this.studentAdmissionNumber)
      .subscribe(res => {
        this.cartEventData = res;
        this.cookie.set("eventCart", JSON.stringify(this.cartEventData));
        this.isEventItemPresent();

        this.loading = false;
        this.filterData();
      });
  }

  isEventItemPresent() {
    for (let i = 0; i < this.eventData.length; i++) {
      var found = false;
      this.eventData[i]["allow"] = true;
      for (let j = 0; j < this.cartEventData.length; j++) {
        /**Check if parallel registrations exist */
        for (let k = 0; k < this.eventData[i].timeSlot.length; k++) {
          for (let l = 0; l < this.cartEventData[j].timeSlot.length; l++) {
            if (
              this.eventData[i].timeSlot[k] ===
                this.cartEventData[j].timeSlot[l] &&
              this.eventData[i].id !== this.cartEventData[j].eventId
            ) {
              this.eventData[i]["allow"] = false;
              break;
            }
          }
        }
        /**Check if user has added event to cart or not */
        if (this.eventData[i].id === this.cartEventData[j].eventId) {
          this.eventData[i]["isPresent"] = true;
          this.eventData[i]["hasCheckedOut"] = this.cartEventData[j][
            "hasCheckedOut"
          ];
          if (
            this.eventData[i]["hasCheckedOut"] === false &&
            this.eventData[i].teamSize > 1
          ) {
            if (this.cookie.get("hasNotified") === "false") {
              this.cookie.set("hasNotified", "true");
              this.snackbar.open(
                "You have pending team requests, head over to your cart",
                "Close",
                {
                  duration: 2500
                }
              );
            }
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
    this.hasEventItemPresenceCalculated = true;
    this.filteredEventData = this.eventData;
  }
  isWorkshopItemPresent() {
    var found = false;
    for (let i = 0; i < this.workshopData.length; i++) {
      this.workshopData[i]["allow"] = true;
      found = false;
      for (let j = 0; j < this.cartWorkshopData.length; j++) {
        if (this.workshopData[i].id === this.cartWorkshopData[j].workshopId) {
          this.workshopData[i]["isPresent"] = true;
          this.workshopData[i]["hasCheckedOut"] = this.cartWorkshopData[j][
            "hasCheckedOut"
          ];
          this.workshopData[i]["allow"] = true;
          // this.cartCount += 1;
          found = true;
          break;
        } else {
          this.workshopData[i]["allow"] = false;
        }
      }
      if (found === false) {
        this.workshopData[i]["isPresent"] = false;
      }
    }
    this.hasWorkshopItemPresenceCalculated = true;
    this.filteredWorkshopData = this.workshopData;
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
    console.log($event);
    console.log("HEllo");
    //this.cartCount += $event;
  }
  refreshData($event) {
    console.log($event);
    this.fetchRegistrationDetails();
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
  filterData() {
    if (this.selectedDepartment === "All") {
      this.filteredEventData = this.eventData;
      this.filteredWorkshopData = this.workshopData;
    } else {
      this.filteredEventData = [];
      this.filteredWorkshopData = [];
      this.eventData.forEach(event => {
        if (event.department === this.selectedDepartment) {
          this.filteredEventData.push(event);
        }
      });
      this.workshopData.forEach(workshop => {
        if (workshop.department === this.selectedDepartment) {
          this.filteredWorkshopData.push(workshop);
        }
      });
    }
    this.hasProcessed = true;
  }
}
