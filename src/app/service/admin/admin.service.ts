import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../../../url";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  constructor(private http: HttpClient) {}
  public getStudentDetails(department: string, eventId: string) {
    const _url = url + "/admin/getRegisteredStudents";
    return this.http.get<any>(_url, {
      params: { department: department, id: eventId }
    });
  }
  public updateAttendance(
    admissionNumber: string,
    id: string,
    status: boolean
  ) {
    const _url = url + "/admin/updateAttendance";
    return this.http.post<any>(_url, {
      admissionNumber: admissionNumber,
      id: id,
      status: status
    });
  }
  public updatePayment(admissionNumber: string, id: string, status: boolean) {
    const _url = url + "/admin/updatePayment";
    return this.http.post<any>(_url, {
      admissionNumber: admissionNumber,
      id: id,
      status: status
    });
  }
  public fetchEventRegisteredStudents(){
    const _url = url + "/admin/getEventRegisteredStudents";
    return this.http.get<any>(_url);
  }
  public fetchWorkshopRegisteredStudents(){
    const _url = url + "/admin/getWOrkshopRegisteredStudents";
    return this.http.get<any>(_url);
  }
  public fetchEventRegistrationCount(){
    const _url = url + "/admin/getEventCount";
    return this.http.get<any>(_url);
  }
  public fetchWorkshopRegistrationCount(){
    const _url = url + "/admin/getWorkshopCount";
    return this.http.get<any>(_url);
  }
}