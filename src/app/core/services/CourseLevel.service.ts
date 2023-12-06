import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CourseLevelService {
    constructor(private http: HttpClient) { }

    apiurl: string = environment.CourseLevel;

    public getAll() {
        return this.http.get(this.apiurl);
    }
}