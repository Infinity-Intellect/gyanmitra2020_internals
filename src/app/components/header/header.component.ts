import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Animations } from "../../../misc_assets/animations/animations";
import { MatDialog } from "@angular/material";
import { CartdialogComponent } from "../cartdialog/cartdialog.component";
import { AuthService } from "src/app/auth.service";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  animations: [Animations.sidenavOpenClose]
})
export class HeaderComponent implements OnInit {
  constructor(private dialog: MatDialog, private authservice: AuthService) {}

  ngOnInit() {}

  sideNavState: string = "open";

  @Output() navbarStateEvent = new EventEmitter();

  toggleSideNav() {
    this.sideNavState = this.sideNavState === "open" ? "closed" : "open";
    this.navbarStateEvent.emit(this.sideNavState);
  }
  openCartDialog() {
    this.dialog.open(CartdialogComponent);
  }
  setLoggedIn() {
    this.authservice.setLoggedIn(false);
  }
}
