import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class InsertedLanguageService {
    constructor(private http: HttpClient) { }

    apiUrl: string = environment.LangUrl;

    public getAll() {
        return this.http.get(this.apiUrl + "/all");
    }
}