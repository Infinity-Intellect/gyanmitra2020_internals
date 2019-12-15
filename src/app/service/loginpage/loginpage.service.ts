import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../../../url";
@Injectable({
  providedIn: "root"
})
export class LoginpageService {
  constructor(private http: HttpClient) {}
  public getStudentPresent(admissionNumber, password) {
    var _url = url + "/student/login";
    return this.http.post<any>(_url, {
      admissionNumber: admissionNumber,
      password: password
    });
  }
}
