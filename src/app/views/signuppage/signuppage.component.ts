import { Component, OnInit } from "@angular/core";
import { Animations } from "src/misc_assets/animations/animations";
import { Router } from '@angular/router';

@Component({
  selector: "app-signuppage",
  templateUrl: "./signuppage.component.html",
  styleUrls: ["./signuppage.component.css"],
  animations: [Animations.swoopIn]
})
export class SignuppageComponent implements OnInit {
  constructor(private router: Router) {}
  admissionNumber: number;
  password: string;
  CPassword: string;
  name: string;
  emptyField: boolean = false;
  passwordMatch: boolean = true;

  ngOnInit() {}
  routeToHomePage = () => {
    if (!this.admissionNumber || !this.password || !this.CPassword || !this.name) {
      this.emptyField = true;
    } else if(this.password != this.CPassword){
      this.passwordMatch = false;
    } else {
      this.router.navigate(["/home"]);
    }
  };
  alterEmptyFieldState = () => {
    this.emptyField = false;
    this.passwordMatch = true;
  };
}
