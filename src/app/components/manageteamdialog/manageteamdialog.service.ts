import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "src/url";

@Injectable({
  providedIn: "root"
})
export class ManageteamdialogService {
  constructor(private http: HttpClient) {}

  public isStudentPresent(admissionNumber: string) {
    const _url = url + "/student/isStudentPresent";
    return this.http.get<any>(_url, {
      params: { admissionNumber: admissionNumber }
    });
  }

  public createTeam(admissionNumbers: string[], eventId: string) {
    const _url = url + "/team/createTeam";
    return this.http.post<any>(_url, {
      admissionNumbers: admissionNumbers,
      eventId: eventId
    });
  }
}
