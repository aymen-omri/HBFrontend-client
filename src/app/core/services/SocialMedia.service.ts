import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class scocialMediaService {
    constructor(private http: HttpClient) { }

    apiUrl: string = environment.socialMediaUrl;

    public getUserSocialMedias(id: number) {
        return this.http.get(this.apiUrl + "/user/" + id);
    }

    public addSocialMedias(SocialMedias: any) {
        return this.http.post(this.apiUrl + "/add", SocialMedias);
    }

    public updateSocialMedia(id : number , socialMedia : any){
        return this.http.put(this.apiUrl+"/update/"+id,socialMedia);
    }

}