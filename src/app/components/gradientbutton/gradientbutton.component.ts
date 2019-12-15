import {
  Component,
  AfterViewInit,
  ElementRef,
  HostListener
} from "@angular/core";

@Component({
  selector: "app-gradientbutton",
  templateUrl: "./gradientbutton.component.html",
  styleUrls: ["./gradientbutton.component.css"]
})
export class GradientbuttonComponent implements AfterViewInit {
  isGradientVisible = false;
  gradientTop: number;
  gradientLeft: number;
  gradientRadius: number;

  constructor(public el: ElementRef<HTMLElement>) {}

  get gradientStyle() {
    const top = this.gradientTop;
    const left = this.gradientLeft;
    const gradientRadius = this.isGradientVisible ? this.gradientRadius : 0;

    return {
      "height.px": gradientRadius,
      "width.px": gradientRadius,
      "top.px": top,
      "left.px": left
    };
  }

  @HostListener("mouseenter")
  onMouseEnter() {
    this.isGradientVisible = true;
  }

  @HostListener("mouseleave")
  onMouseLeave() {
    this.isGradientVisible = false;
  }

  @HostListener("mousemove", ["$event"])
  onMouseMove(event: MouseEvent) {
    this.gradientLeft = event.pageX - this.el.nativeElement.offsetLeft;
    this.gradientTop = event.pageY - this.el.nativeElement.offsetTop;
  }

  ngAfterViewInit() {
    this.gradientRadius = this.el.nativeElement.getBoundingClientRect().width;
  }
}
