import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";

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
  constructor() {}

  @Input() data;

  @Output() cartCount = new EventEmitter();
  cartStatus = "add";
  ngOnInit() {}
  cartStatusChange() {
    this.data.cartStatus =
      this.data.cartStatus === "Add to Cart"
        ? "Remove from Cart"
        : "Add to Cart";
    this.cartStatus = this.cartStatus === "add" ? "remove" : "add";
    if (this.cartStatus === "remove") {
      this.cartCount.emit(1);
    } else {
      this.cartCount.emit(-1);
    }
  }
}
