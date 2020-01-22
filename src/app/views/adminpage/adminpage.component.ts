import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { HomepageService } from "src/app/service/homepage/homepage.service";
import { AdminService } from "src/app/service/admin/admin.service";
import { ExcelService } from "src/app/service/excel/excel.service";
@Component({
  selector: "app-adminpage",
  templateUrl: "./adminpage.component.html",
  styleUrls: ["./adminpage.component.css"]
})
export class AdminpageComponent implements OnInit {
  eventCount: number = 0;
  workshopCount: number = 0;
  excelDataContainer: Array<any> = [];
  excelData: any[] = [];
  isDataPresent: boolean = false;
  attendanceStatus: boolean;
  adminData: any;
  studentData: any[];
  eventData: any[];
  workshopData: any[];
  eventRegData: any[];
  workshopRegData: any[];
  Name: string;
  Department: string;
  loading: boolean = true;
  fileName: string = "ALL";
  studentToSearch = "";
  constructor(
    private cookie: CookieService,
    private adminService: AdminService,
    private homeService: HomepageService,
    private excelService: ExcelService
  ) {
    this.adminData = { name: this.cookie.get("name") };
  }
  ngOnInit() {
    this.fetchEventDetails();
    this.fetchWorkshopDetails();
    this.fetchInfo();
    this.fetchEventCount();
    this.fetchWorkshopCount();
  }
  fetchEventCount(){
    this.adminService.fetchEventRegistrationCount().subscribe(res => {
      if(res.message == 'failed'){
      } else {
        this.eventCount = res.count;
        console.log(this.eventCount);
      }
    })
  }
  fetchWorkshopCount(){
    this.adminService.fetchWorkshopRegistrationCount().subscribe(res => {
      if(res.message == 'failed'){
      } else {
        this.workshopCount = res.count;
        console.log(this.workshopCount)
      }
    })
  }
  fetchInfo(){
    this.studentData = [];
    this.adminService.fetchEventRegisteredStudents().subscribe(res => {
      if (res.message == "No Records found!") {
      } else {
        this.eventRegData = res;
        this.eventRegData.forEach(eveData => {
          this.studentData.push(eveData);
          this.isDataPresent = true;
        })
      }
      this.adminService.fetchWorkshopRegisteredStudents().subscribe(res => {
        if (res.message == "No Records found!") {
        } else {
          this.workshopRegData = res;
          this.workshopRegData.forEach(workData => {
            this.studentData.push(workData);
            this.isDataPresent = true;
          })
        }
        console.log(this.studentData);
      })
    })
  }
  fetchStudentDetails(department, id) {
    this.adminService.getStudentDetails(department, id).subscribe(res => {
      if (res.message != "No Records found!") {
        this.studentData = res;
        this.isDataPresent = true;
      } else {
        this.studentData = [];
        this.isDataPresent = false;
      }
      console.log(this.studentData);
    });
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
  getStudentDetailsByFilter() {
    this.fetchStudentDetails(this.Department, this.Name);
  }
  MakePayment($event) {
    console.log($event.target.value);
  }
  generateExcelSheet() {
    this.excelDataContainer = [];
    this.fileName =
      this.Department + "_" + this.studentData[0].name + "_" + this.Name;
    var sno = 1;
    this.studentData.forEach(element => {
      this.excelData = [];
      this.excelData["S.No."] = sno;
      this.excelData["Roll Number"] = element["rollNumber"];
      this.excelData["Name"] = element["studentName"];
      this.excelData["Department"] = element["program"];
      this.excelData["Event/Workshop"] = element["name"];
      this.excelDataContainer.push(this.excelData);
      sno = sno + 1;
    });
    // console.log(this.studentData);
    // console.log(this.excelDataContainer);
    this.excelService.exportAsExcelFile(this.excelDataContainer, this.fileName);
  }
}
