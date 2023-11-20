import { Injectable } from '@angular/core';
import { User } from '../models/auth.models';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
@Injectable({ providedIn: 'root' })

/**
 * Auth-service Component
 */
export class AuthenticationService {

    apiUrl: string = environment.authUrl;

    constructor(private http: HttpClient, private tokenService: TokenService) { }

    public login(loginRequest: any) {
        return this.http.post(this.apiUrl + '/login', loginRequest);
    }

    public register(registerRequest: any) {
        return this.http.post(this.apiUrl + '/register', registerRequest);
    }

    public logout() {
        this.tokenService.removeToken();
        window.location.replace('/auth/signin-basic');
    }

    public isLoggedIn() {
        return localStorage.getItem("auth_token");
    }

    public googleRegisterLogin(token: string) {
        const params = new HttpParams().set('token', token);
        return this.http.post<any>(this.apiUrl + "/google", params);
    }

}

