import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-descriptiondialog",
  templateUrl: "./descriptiondialog.component.html",
  styleUrls: ["./descriptiondialog.component.css"]
})
export class DescriptiondialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  description = this.data.description;
  ngOnInit() {}
}
