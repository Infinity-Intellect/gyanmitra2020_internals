import {
  animation,
  trigger,
  transition,
  style,
  animate,
  state
} from "@angular/animations";

export const Animations = {
  swoopIn: trigger("swoopIn", [
    transition("void=>*", [
      style({
        transform: "scaleX(0) scaleY(0) rotateX(180deg) rotateY(180deg)"
      }),
      animate("0.2s")
    ])
  ]),
  sidenavOpenClose: trigger("sidenavOpenClose", [
    state(
      "open",
      style({
        opacity: 1,
        transform: "translateX(0)"
      })
    ),
    state(
      "closed",
      style({
        opacity: 0,
        transform: "translateX(-50%)"
      })
    ),
    transition("closed<=>open", [animate("0.2s")])
  ])
};
