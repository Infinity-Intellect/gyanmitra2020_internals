import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { event } from "../../models/event";
import { Observable } from "rxjs";
import { workshop } from "src/app/models/workshop";

@Injectable({
  providedIn: "root"
})
export class HomepageService {
  constructor(private http: HttpClient) {}
  public getEvents() {
    return this.http.get<event[]>("http://localhost:8000/getEvents");
  }
  public getWorkshops() {
    return this.http.get<workshop[]>("http://localhost:8000/getworkshops");
  }
}
