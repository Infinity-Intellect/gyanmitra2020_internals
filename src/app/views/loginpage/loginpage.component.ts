import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Animations } from "../../animations/animations";

@Component({
  selector: "app-loginpage",
  templateUrl: "./loginpage.component.html",
  styleUrls: ["./loginpage.component.css"],
  animations: [Animations.swoopIn]
})
export class LoginpageComponent implements OnInit {
  constructor(private router: Router) {}
  admissionNumber: number;
  password: string;

  emptyField: boolean = false;

  ngOnInit() {}
  routeToHomePage = () => {
    if (!this.admissionNumber || !this.password) {
      this.emptyField = true;
    } else {
      this.router.navigate(["/home"]);
    }
  };
  alterEmptyFieldState = () => {
    this.emptyField = false;
  };
}
