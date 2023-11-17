import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ResetPasswordService {

    constructor(private http: HttpClient) { }

    apiUrl: string = environment.resetPasswordUrl;

    public sendToken(email: string) {
        const params = new HttpParams().set('email', email);
        return this.http.post<any>(this.apiUrl + "/send-token", params );
    }

    public verifToken(verifTokenRequest: any) {
        return this.http.post<any>(this.apiUrl + "/verify-token", verifTokenRequest);
    }

    public changePassword(changePasswordRequest: any) {
        return this.http.post(this.apiUrl + "/reset", changePasswordRequest);
    }

}