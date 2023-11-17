import { SocialAuthService } from "@abacritt/angularx-social-login";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { SharedService } from "src/app/core/services/shared.service";
import { TokenService } from "src/app/core/services/token.service";

@Component({
    selector: "app-signup-basic",
    templateUrl: "./signup-basic.component.html",
    styleUrls: ["./signup-basic.component.scss"],
})
export class SignupBasicComponent implements OnInit {
    fieldTextType!: boolean;

    constructor(private AuthService: AuthenticationService, private share: SharedService, private socialAuth: SocialAuthService, private tokenService: TokenService) { }
    ngOnInit(): void {
        this.registerWithGoogle();
    }

    /**
     * Password Hide/Show
     */
    toggleFieldTextType() {
        this.fieldTextType = !this.fieldTextType;
    }

    formGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', Validators.required),
        username: new FormControl('', Validators.required)
    });

    errMessage: string = '';
    showSpinner: boolean = false;
    hideButton: boolean = false;
    googleUser: any;

    submit() {
        this.showSpinner = true;
        this.hideButton = true;
        if (this.formGroup.valid) {
            this.AuthService.register(this.formGroup.value).subscribe({
                next: (res) => {
                    console.log(res);
                    window.location.replace('/auth/signin-basic');
                },
                error: () => {
                    this.share.errorMessageObservable.subscribe(value => {
                        console.log(value);
                        this.errMessage = value;
                        this.showSpinner = false;
                        this.hideButton = false;
                    });
                },
                complete: () => {
                    console.log("Complete");
                }
            })
        } else {
            if (this.formGroup.get('password')!.hasError('minlength')) {
                this.errMessage = 'Password must be at least 8 characters long';
            } else {
                this.errMessage = 'Please fill all fields';
            }

            this.showSpinner = false;
            this.hideButton = false;
        }
    }

    registerWithGoogle() {
        this.socialAuth.authState.subscribe((user) => {
            let token = user.idToken;
            this.sendGoogleToken(token);
        });
    }

    sendGoogleToken(token: string) {
        this.AuthService.googleRegisterLogin(token).subscribe({
            next: (value: any) => {
                console.log(value);
                this.tokenService.storeToken(value.token);
                window.location.replace("/users/account");
            },
            error: (err: any) => {
                console.log(err);
            },
            complete: () => {
                console.log("Complete!");
            }
        });
    }


}
