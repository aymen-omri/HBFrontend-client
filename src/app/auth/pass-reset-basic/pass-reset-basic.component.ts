import { Token } from "@angular/compiler";
import { ChangeDetectorRef, Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ResetPasswordService } from "src/app/core/services/reset-password.service";
import { SharedService } from "src/app/core/services/shared.service";

@Component({
    selector: "app-pass-reset-basic",
    templateUrl: "./pass-reset-basic.component.html",
    styleUrls: ["./pass-reset-basic.component.scss"],
})
export class PassResetBasicComponent {
    fieldTextType!: boolean;

    constructor(private reset: ResetPasswordService, private share: SharedService, private cdr: ChangeDetectorRef) { }

    /**
     * Password Hide/Show
     */
    toggleFieldTextType() {
        this.fieldTextType = !this.fieldTextType;
    }

    showEmailForm: boolean = true;
    showVerifyForm: boolean = false;
    showResetForm: boolean = false;
    errMessage: string = "";
    userEmail: string = "";
    tokenText: string = "";
    hideButton: boolean = false;
    showSpinner: boolean = false;

    loading() {
        this.hideButton = true;
        this.showSpinner = true;
    }

    closeLoading() {
        this.hideButton = false;
        this.showSpinner = false;
    }

    hideMessage() {
        setTimeout(() => {
            this.errMessage = '';
        }, 4000);
    }

    EmailForm = new FormGroup({
        email: new FormControl('', Validators.required)
    });

    verifyForm = new FormGroup({
        token: new FormControl('', Validators.required)
    });

    resetForm = new FormGroup({
        password: new FormControl("", [Validators.required]),
        confirmPassword: new FormControl("", [Validators.required])
    });

    submitEmailForm() {
        this.loading();
        if (this.EmailForm.valid) {
            this.reset.sendToken(this.EmailForm.value.email!).subscribe({
                next: (data) => {
                    console.log(data);
                    alert("Please check your mail to get the verification code");
                    this.showEmailForm = false;
                    this.showVerifyForm = true;
                    this.userEmail = this.EmailForm.value.email!;
                    this.closeLoading();
                },
                error: (err) => {
                    this.share.errorMessageObservable.subscribe(value => {
                        this.errMessage = value;
                        this.closeLoading();
                        this.hideMessage();
                    });
                },
                complete: () => {
                    console.log("Complete!");
                    this.closeLoading();
                    this.hideMessage();
                }
            })
        } else {
            this.errMessage = "You didn't fill a required field";
        }
    }

    submitVerifyForm() {
        this.loading();
        if (this.verifyForm.valid) {
            this.reset.verifToken({ email: this.userEmail, tokenText: this.verifyForm.value.token }).subscribe({
                next: (value) => {
                    this.closeLoading();
                    console.log(value);
                    this.showVerifyForm = false;
                    this.showResetForm = true;
                    this.tokenText = this.verifyForm.value.token!;
                },
                error: (err) => {
                    this.share.errorMessageObservable.subscribe(value => {
                        this.errMessage = value;
                        this.closeLoading();
                        this.hideMessage();
                    });
                },
                complete: () => {
                    console.log("Complete!");
                }
            });
        } else {
            this.closeLoading();
            this.hideMessage();
            this.errMessage = "You didn't fill a required field";
        }
    }

    submitResetForm() {
        this.loading();
        if (this.resetForm.valid) {
            this.reset.changePassword(
                {
                    email: this.userEmail,
                    tokenText: this.tokenText,
                    newPassword: this.resetForm.value.password,
                    confirmPassword: this.resetForm.value.confirmPassword
                }).subscribe({
                    next: (value) => {
                        console.log(value);
                        window.location.replace("/auth/signin-basic");
                    },
                    error: (err) => {
                        this.share.errorMessageObservable.subscribe(value => {
                            this.errMessage = value;
                            this.closeLoading();
                            this.hideMessage();
                        });
                    },
                    complete: () => {
                        console.log("complete")
                    }
                });
        } else {
            this.closeLoading();
            this.hideMessage();
            this.errMessage = "You didn't fill a required field";
        }

    }
}

