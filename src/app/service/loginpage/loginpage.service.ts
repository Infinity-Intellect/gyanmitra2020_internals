import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../../../url";
@Injectable({
  providedIn: "root"
})
export class LoginpageService {
  constructor(private http: HttpClient) {}
  public getAccountPresent(username, password) {
    var _url = url + "/account/login";
    return this.http.post<any>(_url, {
      username: username,
      password: password
    });
  }
}
