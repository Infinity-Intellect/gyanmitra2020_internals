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
  public getWorkshops() {
    const _url = url + "/workshop/getAll";
    return this.http.get<any[]>(_url);
  }
  public getStudent(admNumber) {
    const _url = url + "/student/getByAdmissionNumber";
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
