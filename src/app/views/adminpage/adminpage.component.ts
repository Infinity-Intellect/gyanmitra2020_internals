import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { HomepageService } from 'src/app/service/homepage/homepage.service';
import { AdminService } from 'src/app/service/admin/admin.service';
@Component({
  selector: "app-adminpage",
  templateUrl: "./adminpage.component.html",
  styleUrls: ["./adminpage.component.css"]
})
export class AdminpageComponent implements OnInit {
  attendanceStatus: boolean
  adminData: any;
  studentData: any[];
  eventData: any[];
  workshopData: any[];
  Name: string;
  Department: string;
  loading: boolean = true;
  constructor(private cookie: CookieService, private adminService: AdminService, private homeService:HomepageService) {
    this.adminData = { name: this.cookie.get("name") };
  }
  ngOnInit() {
    this.fetchEventDetails();
    this.fetchWorkshopDetails();
    this.fetchStudentDetails("ALL","W001");
    this.loading = false;
  }
  fetchStudentDetails(department,id) {
    this.adminService.getStudentDetails(department,id).subscribe(res => {
      this.studentData = res;
      console.log(this.studentData)
    })
  }
  fetchEventDetails() {
    this.homeService.getEvents().subscribe(res => {
      this.eventData = res;
    });
  }
  fetchWorkshopDetails() {
    this.homeService.getWorkshops().subscribe(res => {
      this.workshopData = res;
    });
  }
  getStudentDetailsByFilter(){
    this.fetchStudentDetails(this.Department,this.Name);
  }
  MakePayment($event){
    console.log($event.target.value);
  }
}
