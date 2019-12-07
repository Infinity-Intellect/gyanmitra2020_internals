import { Component, OnInit } from "@angular/core";
import { Animations } from "src/misc_assets/animations/animations";

@Component({
  selector: "app-signuppage",
  templateUrl: "./signuppage.component.html",
  styleUrls: ["./signuppage.component.css"],
  animations: [Animations.swoopIn]
})
export class SignuppageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
