import { Component, OnInit } from "@angular/core";
import { Animations } from "../../../misc_assets/animations/animations";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  animations: [Animations.sidenavOpenClose]
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
