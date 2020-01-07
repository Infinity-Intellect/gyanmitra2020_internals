import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges
} from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { ParticlesModule } from "angular-particle";

@Component({
  selector: "app-landingpage",
  templateUrl: "./landingpage.component.html",
  styleUrls: ["./landingpage.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingpageComponent implements OnInit {
  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;

  constructor(private cookie: CookieService) {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("userLoggedIn");
  }
  counterStatus: Boolean = false;
  remainingTime;
  remainingDays: any = 0;
  remainingHours: any = 0;
  remainingMinutes: any = 0;
  remainingSeconds: Number = 0;
  countDownTimer(countDownDate) {
    this.counterStatus = true;
    this.remainingTime = countDownDate.getTime() - new Date().getTime();
    this.remainingDays = Math.floor(this.remainingTime / (1000 * 60 * 60 * 24));
    this.remainingMinutes = Math.floor(
      (this.remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    this.remainingHours = Math.floor(
      (this.remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    this.remainingSeconds = Math.floor(
      (this.remainingTime % (1000 * 60)) / 1000
    );
    console.log(
      this.remainingDays +
        ":" +
        this.remainingHours +
        ":" +
        this.remainingMinutes +
        ":" +
        this.remainingSeconds
    );
    this.counterStatus = false;
  }
  ngOnInit() {
    let countDownDate = new Date("Jan 24, 2020 00:00:00");
    setInterval(this.countDownTimer, 1000, countDownDate);
    this.myStyle = {
      position: "fixed",
      width: "100%",
      height: "100%",
      "z-index": 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    };
    this.myParams = {
      particles: {
        number: {
          value: 300,
          density: {
            enable: false,
            value_area: 1000
          }
        },
        color: {
          value: "#ffffff"
        },
        size: {
          value: 3,
          random: true
        },
        shape: {
          type: "polygon",
          polygon: {
            nb_sides: 8
          }
        },
        line_linked: {
          enable: false,
          color: "#ffffff"
        },
        move: {
          enable: true,
          speed: 7,
          direction: "bottom-left",
          out_mode: "out",
          bounce: false
        },
        interactivity: {
          detect_on: "window",
          events: {
            onhover: {
              enable: true,
              mode: ["repulse", "grab"]
            },
            onclick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            repulse: {
              distance: 400,
              duration: 0.4
            },
            grab: {
              distance: 2
            },
            push: {
              particles_nb: 20
            }
          }
        }
      }
    };

    this.cookie.deleteAll();
    localStorage.removeItem("loggedIn");
  }
}
