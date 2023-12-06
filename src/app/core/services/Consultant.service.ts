import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ConsultantService {
    constructor(private http: HttpClient) { }

    consultantUrl: string = environment.consultantUrl;
    multimediaUrl: string = environment.multimediaUrl;


    upload(formData: FormData): Observable<HttpEvent<string[]>> {
        return this.http.post<string[]>(`${this.multimediaUrl}/consultant-demo-video`, formData, {
            reportProgress: true,
            observe: 'events'
        });
    }

    sendRequest(form: FormData, id: number) {
        return this.http.post(this.consultantUrl + "/add/user/" + id, form);
    }
}