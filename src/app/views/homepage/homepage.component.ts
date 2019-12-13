import { Component, OnInit, NgModule } from "@angular/core";
import {
  trigger,
  state,
  transition,
  animate,
  style
} from "@angular/animations";
import { MatDialog, MatDialogRef } from "@angular/material";
import { Animations } from "../../../misc_assets/animations/animations";
import { HomepageService } from "src/app/views/homepage/homepage.service";
import { event } from "../../models/event";
import { workshop } from "../../models/workshop";
import { CartdialogComponent } from "src/app/components/cartdialog/cartdialog.component";

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
  constructor(private service: HomepageService, public dialog: MatDialog) {}
  someDate = new Date();
  eventData: event[];
  data;
  workshopData: workshop[];
  ngOnInit() {
    this.fetchEventDetails();
    this.fetchWorkshopDetails();
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
      console.log(this.workshopData);
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
    console.log(this.activeButton);
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
