import { Injectable } from "@angular/core";
import * as CryptoJS from 'crypto-js';
import { environment } from "src/environments/environment";
import { Buffer } from 'buffer';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    private secretKey: string = environment.cryptoSecretKey;

    private encrypt(token: string) {
        return CryptoJS.AES.encrypt(token, this.secretKey).toString();
    }

    private decrypt(token: string) {
        return token ? CryptoJS.AES.decrypt(token, this.secretKey).toString(CryptoJS.enc.Utf8) : null;
    }

    public storeToken(token: string) {
        localStorage.setItem('auth_token', this.encrypt(token));
    }

    public getToken() {
        return this.decrypt(localStorage.getItem('auth_token')!);
    }

    public removeToken() {
        localStorage.removeItem('auth_token');
    }

    public extractUsername() {
        let tokenString = this.getToken();
        if (tokenString) {
            const [headerEncoded, payloadEncoded, signatureEncoded] = tokenString.split('.');
            const header = JSON.parse(Buffer.from(headerEncoded, 'base64').toString());
            const payload = JSON.parse(Buffer.from(payloadEncoded, 'base64').toString());
            const signature = Buffer.from(signatureEncoded, 'base64');
            return payload.sub;
        }
        return;
    }

}