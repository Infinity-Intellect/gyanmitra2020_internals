import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "src/url";

@Injectable({
  providedIn: "root"
})
export class CartdialogService {
  constructor(private http: HttpClient) {}

  public confirmEvent(admissionNumber: String, eventId: String) {
    const _url = url + "/eventregister/checkout";
    return this.http.post<any>(_url, {
      admissionNumber: admissionNumber,
      eventId: eventId
    });
  }
  public confirmWorkshop(admissionNumber: String, eventId: String) {
    const _url = url + "/workshopregister/checkout";
    return this.http.post<any>(_url, {
      admissionNumber: admissionNumber,
      eventId: eventId
    });
  }
}
