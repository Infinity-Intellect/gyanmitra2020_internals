import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from 'src/app/service/admin/admin.service';

@Component({
  selector: 'app-attendance-button',
  templateUrl: './attendance-button.component.html',
  styleUrls: ['./attendance-button.component.css']
})
export class AttendanceButtonComponent implements OnInit {
  admissionNumber: string;
  id: string;
  buttonStatus: string = "Present";
  @Input() studentData;
  status: boolean = false;
  constructor(public service: AdminService) {
  }
  ngOnInit() {
    this.admissionNumber = this.studentData.admissionNumber;
    if(this.studentData.workshopId != null){
      this.id = this.studentData.workshopId;
    }
    if(this.studentData.eventId != null){
      this.id = this.studentData.eventId;
    }
    if(this.studentData.hasAttended == false){
      this.status = true;
      this.buttonStatus = "Absent";
    } else {
      this.status = false;
      this.buttonStatus = "Present";
    }
  }
  UpdateAttendance(){
    this.service.updateAttendance(this.admissionNumber,this.id,this.status).subscribe(res =>{
      console.log(res);
      this.status = this.status ? false : true;
      if(this.status)
        this.buttonStatus = "Absent";
      else
        this.buttonStatus = "Present"
    });
  }
  MarkAttendence($event){
    this.UpdateAttendance();
  }
}
