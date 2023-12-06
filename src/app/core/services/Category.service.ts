import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    constructor(private http: HttpClient) { }

    apiUrl: string = environment.categoryUrl;

    public getAll() {
        return this.http.get(this.apiUrl);
    }
}