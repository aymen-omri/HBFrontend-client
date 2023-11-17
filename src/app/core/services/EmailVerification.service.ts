import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class EmailVerificationService {
    constructor(private http: HttpClient) { }

    apiUrl = environment.emailVerificationUrl;

    verify(token: string) {
        const params = new HttpParams().set('email', token)
        return this.http.post(`${this.apiUrl}/verify`, params);
    }

    isVerified(email: string) {
        return this.http.get(this.apiUrl + "/is-verified/" + email);
    }
}