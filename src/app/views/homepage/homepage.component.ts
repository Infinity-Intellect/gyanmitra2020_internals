import { Component, OnInit } from "@angular/core";
import {
  trigger,
  state,
  transition,
  animate,
  style
} from "@angular/animations";
import { Animations } from "../../../misc_assets/animations/animations";
import { HomepageService } from "src/app/components/homepage.service";

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
  constructor(private service: HomepageService) {}
  data = [
    { message: "DBMania", cartStatus: "Add to Cart", checkout: true },
    { message: "Code Builder", cartStatus: "Add to Cart", checkout: false },
    { message: "Hackathon", cartStatus: "Add to Cart", checkout: false }
  ];
  ngOnInit() {}

  cartCount: number = 0;
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
  }
  /*End of function definitions to handle animation state variables*/
  changeCartCount($event) {
    this.cartCount += $event;
  }
}
