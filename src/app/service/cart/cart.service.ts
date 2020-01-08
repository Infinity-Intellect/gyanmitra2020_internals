import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "src/url";

@Injectable({
  providedIn: "root"
})
export class CartService {
  constructor(private http: HttpClient) {}

  //earlier get now post
  public getEventRegisteredDetails(admissionNumber) {
    const _url = url + "/eventregister/getRegisteredEvents";
    return this.http.post<any>(_url, { admissionNumber: admissionNumber });
  }
  //earlier get now post
  public getWorkshopRegisteredDetails(amdissionNumber) {
    const _url = url + "/workshopregister/getRegisteredWorkshops";
    return this.http.post<any>(_url,{ admissionNumber: amdissionNumber });
  }
  //earlier get now post
  public doesTeamExist(admissionNumber: any, eventId: string) {
    const _url = url + "/team/doesTeamExist";
    return this.http.post<any>(_url, { admissionNumber: admissionNumber, eventId: eventId });
  }
}
