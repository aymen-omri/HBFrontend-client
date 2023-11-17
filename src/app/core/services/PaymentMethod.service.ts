import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PaymentMethodService {
    constructor(private http: HttpClient) { }

    apiUrl: string = environment.paymentMethodUrl;

    public getAllByUserId(id: number) {
        return this.http.get<any>(`${this.apiUrl}/user/${id}`);
    }
    public insertPaymentMethod(paymentMethod: any) {
        return this.http.post(`${this.apiUrl}/add`, paymentMethod);
    }
    public updatePaymentMethod(id: number, paymentMethod: any) {
        return this.http.put(`${this.apiUrl}/${id}`, paymentMethod);
    }
    public deletePaymentMethod(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}