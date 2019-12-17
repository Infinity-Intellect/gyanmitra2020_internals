import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DescriptiondialogComponent } from "../descriptiondialog/descriptiondialog.component";
import { DisplaycardService } from "src/app/service/displaycard/displaycard.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-displaycard",
  templateUrl: "./displaycard.component.html",
  styleUrls: ["./displaycard.component.css"],
  animations: [
    trigger("buttonStyle", [
      state(
        "Add",
        style({
          backgroundColor: "green"
        })
      ),
      state(
        "Remove",
        style({
          backgroundColor: "red"
        })
      ),
      transition("Add => Remove", animate("0.1s"))
    ])
  ]
})
export class DisplaycardComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private service: DisplaycardService,
    private cookie: CookieService
  ) {}

  @Input() event_workshopdata;
  @Input() cartData;

  @Output() cartCount = new EventEmitter();

  cartStatus = "Add";
  hasCheckedOut: boolean = false;
  currentCard: any;
  admissionNumber = this.cookie.get("username");

  ngOnInit() {
    if (this.event_workshopdata.isPresent) {
      this.cartStatus = "Remove";
    }
    this.hasCheckedOut = this.event_workshopdata.hasCheckedOut;
  }
  cartStatusChange(event: any) {
    event.stopPropagation();
    if (this.cartStatus === "Remove") {
      if (this.event_workshopdata.id[0] === "W") {
        this.service
          .deleteWorkshopFromCart(
            this.admissionNumber,
            this.event_workshopdata.id
          )
          .subscribe(res => {
            if (res.message === "Success") {
              this.cartStatus = "Add";
              this.cartCount.emit(-1);
            } else {
              console.log(res.message);
            }
          });
      } else if (this.event_workshopdata.id[0] === "E") {
        this.service
          .deleteEventFromCart(this.admissionNumber, this.event_workshopdata.id)
          .subscribe(res => {
            if (res.message === "Success") {
              this.cartStatus = "Add";
              this.cartCount.emit(-1);
            } else {
              console.log(res.message);
            }
          });
      }
    } else {
      if (this.event_workshopdata.id[0] === "W") {
        this.service
          .addWorkshopToCart(this.admissionNumber, this.event_workshopdata.id)
          .subscribe(res => {
            if (res.message === "Success") {
              this.cartStatus = "Remove";
              this.cartCount.emit(1);
            } else {
              console.log(res.message);
            }
          });
      } else if (this.event_workshopdata.id[0] === "E") {
        this.service
          .addEventToCart(this.admissionNumber, this.event_workshopdata.id)
          .subscribe(res => {
            if (res.message === "Success") {
              this.cartStatus = "Remove";
              this.cartCount.emit(1);
            } else {
              console.log(res.message);
            }
          });
      }
    }
  }
  openDescriptionDialog(event: any) {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(DescriptiondialogComponent, dialogConfig);
  }
}
