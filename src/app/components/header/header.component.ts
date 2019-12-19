import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { Animations } from "../../../misc_assets/animations/animations";
import { MatDialog } from "@angular/material";
import { CartdialogComponent } from "../cartdialog/cartdialog.component";
import { AuthService } from "src/app/auth.service";
import { ManageteamdialogComponent } from "../manageteamdialog/manageteamdialog.component";
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
  @Input() eventData: any[];
  @Input() workshopData: any[];

  toggleSideNav() {
    this.sideNavState = this.sideNavState === "open" ? "closed" : "open";
    this.navbarStateEvent.emit(this.sideNavState);
  }
  openCartDialog() {
    this.dialog.open(CartdialogComponent, {
      height: "500px",
      width: "500px",
      data: { eventCart: this.eventData, workshopCart: this.workshopData }
    });
  }

  setLoggedIn() {
    this.authservice.setUserLoggedIn(false);
  }
}
