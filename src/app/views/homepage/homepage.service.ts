import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HomepageService {
  constructor(private http: HttpClient) {}
  getEvents() {
    return this.http.get("192.168.29.147:8000/getEvents");
  }
}
