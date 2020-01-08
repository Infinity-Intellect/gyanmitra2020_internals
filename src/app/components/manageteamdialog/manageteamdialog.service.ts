import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "src/url";

@Injectable({
  providedIn: "root"
})
export class ManageteamdialogService {
  constructor(private http: HttpClient) {}

  //earlier get now post route
  public doStudentsExist(admissionNumbers: string[]) {
    const _url = url + "/student/doStudentsExist";
    return this.http.post<any>(_url, { admissionNumbers: admissionNumbers });
  }

  public createTeam(admissionNumbers: string[], eventId: string) {
    const _url = url + "/team/createTeam";
    return this.http.post<any>(_url, {
      admissionNumbers: admissionNumbers,
      eventId: eventId
    });
  }

  //earlier get now post
  public isInTeam(admissionNumbers: any[], eventId: string) {
    const _url = url + "/team/isInTeam";
    return this.http.post<any>(_url,{ admissionNumbers: admissionNumbers, eventId: eventId });
  }
}
