import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";

@Component({
  selector: "timer",
  templateUrl: "./timer.component.html",
  styleUrls: ["./timer.component.css"]
})
export class TimerComponent implements OnInit, OnChanges {
  constructor() {}

  @Input() days;
  @Input() hours;
  @Input() minutes;
  @Input() seconds;
  ngOnChanges(changes: SimpleChanges) {}
  ngOnInit() {}
}
