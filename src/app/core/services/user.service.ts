import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/auth.models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    constructor(private http: HttpClient) { }

    apiUrl = environment.userUrl;

    public getByEmail(email: string) {
        //const trimmedAndEncodedEmail = encodeURIComponent(email.trim());
        const params = new HttpParams().set('email', email);
        return this.http.get(this.apiUrl + "/by-email", { params });
    }

    public addProfilePicture(id: number, formData: FormData) {
        return this.http.post(this.apiUrl + "/" + id + "/profile-picture", formData);
    }

    public updateUserData(user: any, id: number) {
        return this.http.put(this.apiUrl + "/" + id, user);
    }

    public updateUserPassword(updatePasswordRequest: any, id: number) {
        return this.http.put(this.apiUrl + "/update-password/" + id, updatePasswordRequest);
    }
}
