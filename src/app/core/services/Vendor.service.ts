import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class VendorService {
    constructor(private http: HttpClient) { }

    apiUrl: string = environment.vendorUrl;

    sendVendorRequest(formData: FormData) {
        return this.http.post(this.apiUrl + '/add', formData);
    }

    getVendorByIdUser(id: number) {
        return this.http.get(this.apiUrl + '/user/' + id);
    }
}