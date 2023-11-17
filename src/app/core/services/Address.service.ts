import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AddressService {

    constructor(private http: HttpClient) { }

    countryUrl = environment.countryUrl;
    addressUrl = environment.addressUrl;

    public getAllCountries() {
        return this.http.get(this.countryUrl + "/all");
    }

    public saveAddress(address: any, id_user: number) {
        return this.http.post(this.addressUrl + "/user/" + id_user, address);
    }

    public getAdressesByIdUser(id: number) {
        return this.http.get(this.addressUrl + "/user/" + id);
    }

    public updateAddress(id_address: number, id_country: number, id_user: number, address: any) {
        return this.http.put(this.addressUrl + "/" + id_address + "/country/" + id_country + "/user/" + id_user, address);
    }

    public deleteAddress(id_address: number) {
        return this.http.delete(this.addressUrl + "/" + id_address);
    }

}