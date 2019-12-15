import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor() {}
  loggedInStatus = JSON.parse(localStorage.getItem("loggedIn") || "false");

  get isLoggedIn() {
    return JSON.parse(
      localStorage.getItem("loggedIn") || this.loggedInStatus.toString()
    );
  }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem("loggedIn", "true");
  }
}
