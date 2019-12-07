import { Component, OnInit } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  animations: [
    trigger("sidenavOpenClose", [
      state(
        "open",
        style({
          opacity: 1,
          transform: "translateX(0)"
        })
      ),
      state(
        "closed",
        style({
          opacity: 0,
          transform: "translateX(-50%)"
        })
      ),
      transition("closed<=>open", [animate("0.2s")])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  sideNavState: string = "open";
  toggleSideNav() {
    this.sideNavState = this.sideNavState === "open" ? "closed" : "open";
    console.log(this.sideNavState);
  }
}
