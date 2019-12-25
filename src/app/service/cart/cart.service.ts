import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "src/url";

@Injectable({
  providedIn: "root"
})
export class CartService {
  constructor(private http: HttpClient) {}

  public getEventRegisteredDetails(admissionNumber) {
    const _url = url + "/eventregister/getRegisteredEvents";
    return this.http.get<any>(_url, {
      params: { admissionNumber: admissionNumber }
    });
  }
  public getWorkshopRegisteredDetails(amdissionNumber) {
    const _url = url + "/workshopregister/getRegisteredWorkshops";
    return this.http.get<any>(_url, {
      params: { admissionNumber: amdissionNumber }
    });
  }
  public doesTeamExist(admissionNumber: any, eventId: string) {
    const _url = url + "/team/doesTeamExist";
    return this.http.get<any>(_url, {
      params: { admissionNumber: admissionNumber, eventId: eventId }
    });
  }
}
