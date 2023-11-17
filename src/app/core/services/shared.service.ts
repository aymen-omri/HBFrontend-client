import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    
    //Share error messages between interceptors and components
    private errorMessage = new BehaviorSubject<string>("");
    public errorMessageObservable = this.errorMessage.asObservable();
    public updateErrorMessage(err: string) {
        this.errorMessage.next(err);
    }

}