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
  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  ngOnInit() {
    setInterval(()=>{
      var t = Date.parse("January 24, 2020 09:00:00 GMT+0530") - Date.parse(new Date().toString());
      var seconds = Math.floor((t / 1000) % 60);
      var minutes = Math.floor((t / 1000 / 60) % 60);
      var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      var days = Math.floor(t / (1000 * 60 * 60 * 24));
      this.days = days;
      this.hours = hours;
      this.minutes = minutes;
      this.seconds = seconds;
    },1000)
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
    localStorage.setItem("fromLanding", "true");
  }
}
