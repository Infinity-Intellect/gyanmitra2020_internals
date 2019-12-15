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

@Component({
  selector: "app-displaycard",
  templateUrl: "./displaycard.component.html",
  styleUrls: ["./displaycard.component.css"],
  animations: [
    trigger("buttonStyle", [
      state(
        "add",
        style({
          backgroundColor: "green"
        })
      ),
      state(
        "remove",
        style({
          backgroundColor: "red"
        })
      ),
      transition("add => remove", animate("0.1s"))
    ])
  ]
})
export class DisplaycardComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  @Input() event_workshopdata;
  @Input() cartData;

  @Output() cartCount = new EventEmitter();

  cartStatus = "add";
  checkout: boolean = true;

  ngOnInit() {}
  cartStatusChange(event: any) {
    event.stopPropagation();
    this.cartStatus = this.cartStatus === "add" ? "remove" : "add";
    if (this.cartStatus === "remove") {
      this.cartCount.emit(1);
    } else {
      this.cartCount.emit(-1);
    }
  }
  openDescriptionDialog(event: any) {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(DescriptiondialogComponent, dialogConfig);
  }
}
