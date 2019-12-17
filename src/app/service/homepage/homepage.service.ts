import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../../../url";

@Injectable({
  providedIn: "root"
})
export class HomepageService {
  constructor(private http: HttpClient) {}
  public getEvents() {
    return this.http.get<any[]>("http://localhost:3000/event/getAll");
  }
  public getWorkshops() {
    return this.http.get<any[]>("http://localhost:3000/workshop/getAll");
  }
  public getStudent(admNumber) {
    const _url = url + "/student/getByAdmissionNumber/";
    return this.http.get<any>(_url, { params: { admissionNumber: admNumber } });
  }
  public getWorkshopRegisteredDetails(amdissionNumber) {
    const _url = url + "/workshopregister/getRegisteredWorkshops";
    return this.http.get<any>(_url, {
      params: { admissionNumber: amdissionNumber }
    });
  }
  public getEventRegisteredDetails(admissionNumber) {
    const _url = url + "/eventregister/getRegisteredEvents";
    return this.http.get<any>(_url, {
      params: { admissionNumber: admissionNumber }
    });
  }
}
