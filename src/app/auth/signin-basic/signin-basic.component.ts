import { SocialAuthService } from "@abacritt/angularx-social-login";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { SharedService } from "src/app/core/services/shared.service";
import { TokenService } from "src/app/core/services/token.service";

@Component({
    selector: "app-signin-basic",
    templateUrl: "./signin-basic.component.html",
    styleUrls: ["./signin-basic.component.scss"],
})
export class SigninBasicComponent implements OnInit {
    fieldTextType!: boolean;

    constructor(
        private AuthService: AuthenticationService,
        private share: SharedService,
        private socialAuth: SocialAuthService,
        private tokenService: TokenService
    ) { }
    ngOnInit(): void {
        this.loginWithGoogle();
    }

    /**
     * Password Hide/Show
     */
    toggleFieldTextType() {
        this.fieldTextType = !this.fieldTextType;
    }

    formGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });

    errMessage: string = '';

    submit() {
        if (this.formGroup.valid) {
            this.AuthService.login(this.formGroup.value).subscribe({
                next: (res: any) => {
                    this.tokenService.storeToken(res.token);
                    window.location.replace('/users/account');
                },
                error: () => {
                    this.share.errorMessageObservable.subscribe(value => {
                        console.log(value);
                        this.errMessage = value;
                    });
                },
                complete: () => {
                    console.log("Complete");
                }
            })
        } else {
            this.errMessage = "Error while inserting email or password!";
        }
    }

    loginWithGoogle() {
        this.socialAuth.authState.subscribe((user) => {
            let token = user.idToken;
            this.sendGoogleToken(token);
        });
    }

    sendGoogleToken(token: string) {
        this.AuthService.googleRegisterLogin(token).subscribe({
            next: (value: any) => {
                this.tokenService.storeToken(value.token);
                alert("Logged in successfully!");
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
