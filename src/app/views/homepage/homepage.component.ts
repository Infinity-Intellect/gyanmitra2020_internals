import { Component, OnInit, NgModule } from "@angular/core";
import {
  trigger,
  state,
  transition,
  animate,
  style
} from "@angular/animations";
import { ActivatedRoute } from "@angular/router";
import { MatDialog, MatDialogRef } from "@angular/material";
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
  someDate = new Date();
  eventData: event[];
  student: any;
  studentData: any;
  studentAdmissionNumber: string;
  constructor(
    private service: HomepageService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private cookie: CookieService
  ) {
    this.studentAdmissionNumber = this.cookie.get("username");
  }

  data;
  workshopData: workshop[];
  ngOnInit() {
    this.fetchStudentDetails();
    this.fetchEventDetails();
    this.fetchWorkshopDetails();
  }
  fetchStudentDetails() {
    this.service.getStudent(this.studentAdmissionNumber).subscribe(res => {
      this.studentData = res;
      this.cookie.set("name", this.studentData.name);
      this.cookie.set("program", this.studentData.program);
    });
  }
  fetchEventDetails() {
    this.service.getEvents().subscribe(res => {
      this.eventData = res;
      this.data = this.eventData;
    });
  }
  fetchWorkshopDetails() {
    this.service.getWorkshops().subscribe(res => {
      this.workshopData = res;
    });
  }

  cartCount: number = 0;
  selectedDepartment: string;

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
    if (this.activeButton === "event") {
      this.data = this.eventData;
    } else {
      this.data = this.workshopData;
    }
  }
  /*End of function definitions to handle animation state variables*/
  changeCartCount($event) {
    this.cartCount += $event;
  }
  openCartDialog() {
    this.dialog.open(CartdialogComponent);
  }
}
