import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from 'src/app/service/admin/admin.service';

@Component({
  selector: 'app-payment-button',
  templateUrl: './payment-button.component.html',
  styleUrls: ['./payment-button.component.css']
})
export class PaymentButtonComponent implements OnInit {
  admissionNumber: string;
  id: string;
  buttonStatus: string = "NotPaid";
  @Input() studentData;
  status: boolean = false;
  constructor(public service: AdminService) { }

  ngOnInit() {
    this.admissionNumber = this.studentData.admissionNumber;
    if(this.studentData.workshopId != null){
      this.id = this.studentData.workshopId;
    }
    if(this.studentData.eventId != null){
      this.id = this.studentData.eventId;
    }
    if(this.studentData.hasPaid == false){
      this.status = true;
      this.buttonStatus = "NotPaid";
    } else {
      this.status = false;
      this.buttonStatus = "Paid";
    }
  }
  UpdatePayment(){
    this.service.updatePayment(this.admissionNumber,this.id,this.status).subscribe(res =>{
      console.log(res);
      this.status = this.status ? false : true;
      if(this.status)
        this.buttonStatus = "NotPaid";
      else
        this.buttonStatus = "Paid"
    });
  }
  MarkPayment($event){
    this.UpdatePayment();
  }
}
