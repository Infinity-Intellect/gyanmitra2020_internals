import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "src/url";

@Injectable({
  providedIn: "root"
})
export class DisplaycardService {
  constructor(private http: HttpClient) {}
  public addWorkshopToCart(
    admissionNumber: String,
    workshopId: String,
    name: String
  ) {
    const _url = url + "/workshopregister/addToCart";
    return this.http.post<any>(_url, {
      admissionNumber: admissionNumber,
      workshopId: workshopId,
      name: name
    });
  }
  public deleteWorkshopFromCart(admissionNumber: String, workshopId: String) {
    const _url = url + "/workshopregister/deleteFromCart";
    return this.http.post<any>(_url, {
      admissionNumber: admissionNumber,
      workshopId: workshopId
    });
  }
  public addEventToCart(
    admissionNumber: String,
    eventId: String,
    name: String
  ) {
    const _url = url + "/eventregister/addToCart";
    return this.http.post<any>(_url, {
      admissionNumber: admissionNumber,
      eventId: eventId,
      name: name
    });
  }
  public deleteEventFromCart(admissionNumber: String, eventId: String) {
    const _url = url + "/eventregister/deleteFromCart";
    return this.http.post<any>(_url, {
      admissionNumber: admissionNumber,
      eventId: eventId
    });
  }
}
