import { Injectable } from "@angular/core";
import { url } from "src/url";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ViewteamdialogService {
  constructor(private http: HttpClient) {}
  //earlier get now post
  public getTeamDetails(admissionNumber: string, eventId: string) {
    const _url = url + "/team/getTeamMemberDetails";
    return this.http.get<any>(_url, {
      params: { admissionNumber: admissionNumber, eventId: eventId }
    });
  }
  public confirmParticipation(admissionNumber: any, eventId: any) {
    const _url = url + "/team/confirmParticipation";
    return this.http.post<any>(_url, {
      admissionNumber: admissionNumber,
      eventId: eventId
    });
  }
}
