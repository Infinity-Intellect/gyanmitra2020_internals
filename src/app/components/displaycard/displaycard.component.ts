import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { MatDialog, MatDialogConfig, MatSnackBar } from "@angular/material";
import { DescriptiondialogComponent } from "../descriptiondialog/descriptiondialog.component";
import { DisplaycardService } from "src/app/service/displaycard/displaycard.service";
import { CookieService } from "ngx-cookie-service";
import { HomepageService } from "src/app/service/homepage/homepage.service";
import { ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-displaycard",
  templateUrl: "./displaycard.component.html",
  styleUrls: ["./displaycard.component.css"],
  animations: [
    trigger("buttonStyle", [
      state(
        "Add",
        style({
          backgroundColor: "green"
        })
      ),
      state(
        "Remove",
        style({
          backgroundColor: "red"
        })
      ),
      transition("Add <=> Remove", animate("0.1s"))
    ])
  ]
})
export class DisplaycardComponent implements OnInit, OnChanges {
  constructor(
    private dialog: MatDialog,
    private service: DisplaycardService,
    private cookie: CookieService,
    private snackBar: MatSnackBar
  ) {}

  @Input() event_workshopdata;
  @Input() cartData;

  @Output() cartCount = new EventEmitter();
  @Output() hasDoneCartOperation = new EventEmitter();

  // @Output() hasDoneCartOperation = new EventEmitter();

  cartStatus: String;
  hasCheckedOut: boolean = false;
  currentCard: any;
  admissionNumber = this.cookie.get("username");

  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit() {
    //console.log(this.event_workshopdata);
    this.enableCartButtonStatus(this.event_workshopdata);
    this.hasCheckedOut = this.event_workshopdata.hasCheckedOut;
  }
  enableCartButtonStatus(data) {
    //console.log(data);
    //console.log(data.isPresent);
    if (data.isPresent) {
      this.cartStatus = "Remove";
    } else {
      this.cartStatus = "Add";
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
  cartStatusChange(event: any) {
    this.fireConfetti(event);
    event.stopPropagation();
    //this.cartCount.emit(true);
    if (this.cartStatus === "Remove") {
      //this.cartStatus = "Add";
      if (this.event_workshopdata.id[0] === "W") {
        this.service
          .deleteWorkshopFromCart(
            this.admissionNumber,
            this.event_workshopdata.id
          )
          .subscribe(res => {
            if (res.message === "Success") {
              this.cartStatus = "Add";
              this.hasDoneCartOperation.emit(true);
              //this.cartCount.emit(-1);
            } else {
              console.log(res.message);
            }
          });
      } else if (this.event_workshopdata.id[0] === "E") {
        this.service
          .deleteEventFromCart(this.admissionNumber, this.event_workshopdata.id)
          .subscribe(res => {
            if (res.message === "Success") {
              this.cartStatus = "Add";
              this.hasDoneCartOperation.emit(true);
              //this.cartCount.emit(-1);
            } else {
              console.log(res.message);
            }
          });
      }
      this.openSnackBar("Removed from Cart", "Close");
    } else if (this.cartStatus === "Add") {
      //this.cartStatus = "Remove";
      if (this.event_workshopdata.id[0] === "W") {
        this.service
          .addWorkshopToCart(
            this.admissionNumber,
            this.event_workshopdata.id,
            this.event_workshopdata.name
          )
          .subscribe(res => {
            if (res.message === "Success") {
              this.cartStatus = "Remove";
              this.hasDoneCartOperation.emit(true);
              //this.cartCount.emit(1);
            } else {
              console.log(res.message);
            }
          });
      } else if (this.event_workshopdata.id[0] === "E") {
        this.service
          .addEventToCart(
            this.admissionNumber,
            this.event_workshopdata.id,
            this.event_workshopdata.name,
            this.event_workshopdata.teamSize
          )
          .subscribe(res => {
            if (res.message === "Success") {
              this.cartStatus = "Remove";
              this.hasDoneCartOperation.emit(true);
              //this.cartCount.emit(1);
            } else {
              console.log(res.message);
            }
          });
      }
      this.openSnackBar("Please confirm from cart", "Close");
    }
  }
  openDescriptionDialog(event: any) {
    this.fireConfetti(event);
    event.stopPropagation();
    this.dialog.open(DescriptiondialogComponent, {
      width: "500px",
      height: "500px",
      data: { description: this.event_workshopdata.description }
    });
  }

  confetti(args: any) {
    return window["confetti"].apply(this, arguments);
  }
  fireConfetti(event: any) {
    var x = event.clientX;
    var y = event.clientY;
    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;
    x = Math.abs(x - pageWidth) / pageWidth;
    y = Math.abs(y - pageHeight) / pageHeight;
    console.log(x + " " + y);
    this.confetti({
      angle: 90,
      spread: 20,
      particleCount: 100,
      origin: {
        x: 1 - x,
        y: 1 - y
      }
    });
  }
}
