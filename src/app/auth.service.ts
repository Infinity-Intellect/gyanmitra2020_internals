import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor() {}
  userLoggedInStatus = JSON.parse(
    localStorage.getItem("userLoggedIn") || "false"
  );

  adminLoggedInStatus = JSON.parse(
    localStorage.getItem("adminLoggedIn") || "false"
  );

  get isUserLoggedIn() {
    return JSON.parse(
      localStorage.getItem("userLoggedIn") || this.userLoggedInStatus.toString()
    );
  }

  get isAdminLoggedIn() {
    return JSON.parse(
      localStorage.getItem("adminLoggedIn") ||
        this.adminLoggedInStatus.toString()
    );
  }

  setUserLoggedIn(value: boolean) {
    this.userLoggedInStatus = value;
    localStorage.setItem("userLoggedIn", "true");
  }

  setAdminLoggedIn(value: boolean) {
    this.userLoggedInStatus = value;
    localStorage.setItem("adminLoggedIn", "true");
  }
}
