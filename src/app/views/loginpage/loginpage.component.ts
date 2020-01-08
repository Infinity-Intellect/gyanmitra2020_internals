import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Animations } from "../../../misc_assets/animations/animations";
import { url } from "../../../url";
import { LoginpageService } from "../../service/loginpage/loginpage.service";
import { trigger, transition, style, animate } from "@angular/animations";
import { AuthService } from "src/app/auth.service";
import { CookieService } from "ngx-cookie-service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-loginpage",
  templateUrl: "./loginpage.component.html",
  styleUrls: ["./loginpage.component.css"],
  animations: [Animations.swoopIn, Animations.fadeInOut, Animations.flyIn]
})
export class LoginpageComponent implements OnInit {
  // myStyle: object = {};
  // myParams: object = {};
  // width: number = 100;
  // height: number = 100;
  constructor(
    private router: Router,
    private service: LoginpageService,
    private authservice: AuthService,
    private cookie: CookieService,
    private snackbar: MatSnackBar
  ) {}
  username: string;
  password: string;
  incorrectInputData: boolean = false;
  ripples: Boolean = true;

  emptyField: boolean = false;

  ngOnInit() {
    // this.myStyle = {
    //   width: "100%",
    //   height: "100%",
    //   top: 0,
    //   left: 0,
    //   right: 0,
    //   bottom: 0
    // };
    // this.myParams = {
    //   particles: {
    //     number: {
    //       value: 300,
    //       density: {
    //         enable: false,
    //         value_area: 600
    //       }
    //     },
    //     color: {
    //       value: "#ffffff"
    //     },
    //     size: {
    //       value: 3,
    //       random: true
    //     },
    //     shape: {
    //       type: "polygon",
    //       polygon: {
    //         nb_sides: 5
    //       }
    //     },
    //     line_linked: {
    //       enable: false,
    //       color: "#ffffff"
    //     },
    //     move: {
    //       enable: true,
    //       speed: 1,
    //       direction: "bottom-left",
    //       out_mode: "out",
    //       bounce: false
    //     },
    //     interactivity: {
    //       detect_on: "window",
    //       events: {
    //         onhover: {
    //           enable: true,
    //           mode: ["repulse", "grab"]
    //         },
    //         onclick: {
    //           enable: true,
    //           mode: "push"
    //         },
    //         resize: true
    //       },
    //       modes: {
    //         repulse: {
    //           distance: 400,
    //           duration: 0.4
    //         },
    //         grab: {
    //           distance: 2
    //         },
    //         push: {
    //           particles_nb: 20
    //         }
    //       }
    //     }
    //   }
    // };
    this.cookie.deleteAll();
  }

  routeToHomePage = () => {
    if (!this.username || !this.password) {
      this.emptyField = true;
      this.snackbar.open("Sensing Empty Fields !", "Close", {
        duration: 3000,
        panelClass: ["red-snackbar"]
      });
    } else {
      this.service
        .getAccountPresent(this.username, this.password)
        .subscribe(data => {
          if (data.username !== -1) {
            if (data.role === "admin") {
              this.authservice.setAdminLoggedIn(true);
              this.setUserCookies(data);
              this.router.navigateByUrl("/admin");
            }
            if (data.role === "user") {
              this.authservice.setUserLoggedIn(true);
              this.setUserCookies(data);
              this.router.navigateByUrl("/home");
            }
          } else {
            this.snackbar.open("Username/Password Mismatch !", "Close", {
              duration: 3000,
              panelClass: ["red-snackbar"]
            });
          }
        });
    }
  };
  setUserCookies(data) {
    this.cookie.set("username", data.username);
    this.cookie.set("role", data.role);
    this.cookie.set("hasNotified", "false");
  }
  alterEmptyFieldState = () => {
    this.emptyField = false;
    this.incorrectInputData = false;
  };
}
