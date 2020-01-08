import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../../../url";

@Injectable({
  providedIn: "root"
})
export class HomepageService {
  constructor(private http: HttpClient) {}
  public getEvents() {
    const _url = url + "/event/getAll";
    return this.http.post<any[]>(_url, { msg: "hello" });
  }
  //earlier get now post
  public getWorkshops() {
    const _url = url + "/workshop/getAll";
    return this.http.get<any[]>(_url);
  }
  //earlier get now post
  public getStudent(admNumber) {
    const _url = url + "/student/getByAdmissionNumber";
    return this.http.get<any>(_url, { params: { admissionNumber: admNumber } });
  }
  //earlier get now post
  public getWorkshopRegisteredDetails(amdissionNumber) {
    const _url = url + "/workshopregister/getRegisteredWorkshops";
    return this.http.get<any>(_url, {
      params: { admissionNumber: amdissionNumber }
    });
  }
  //earlier get now post
  public getEventRegisteredDetails(admissionNumber) {
    const _url = url + "/eventregister/getRegisteredEvents";
    return this.http.get<any>(_url, {
      params: { admissionNumber: admissionNumber }
    });
  }
}
