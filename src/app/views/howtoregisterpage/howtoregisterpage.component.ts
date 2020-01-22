import { Component, OnInit } from "@angular/core";
import { Animations } from "../../../misc_assets/animations/animations";

@Component({
  selector: "app-howtoregisterpage",
  templateUrl: "./howtoregisterpage.component.html",
  styleUrls: ["./howtoregisterpage.component.css"],
  animations: [Animations.shiftContents]
})
export class HowtoregisterpageComponent implements OnInit {
  constructor() {}
  navbarState = "";

  ngOnInit() {}

  receiveNavbarState($event) {
    this.navbarState = $event;
  }
}
