import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    constructor(private http: HttpClient) { }

    courseUrl: string = environment.courseUrl;

    public add(course: any) {
        return this.http.post(this.courseUrl, course);
    }

    public getAllByUserId(id: number) {
        return this.http.get(this.courseUrl + "/user/" + id);
    }
}