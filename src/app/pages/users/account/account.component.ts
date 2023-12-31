import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { AddressService } from "src/app/core/services/Address.service";
import { EmailVerificationService } from "src/app/core/services/EmailVerification.service";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { SharedService } from "src/app/core/services/shared.service";
import { TokenService } from "src/app/core/services/token.service";
import { UserProfileService } from "src/app/core/services/user.service";
import { AddUpdatePaymentMethodComponent } from "../add-update-payment-method/add-update-payment-method.component";
import { PaymentMethodService } from "src/app/core/services/PaymentMethod.service";

@Component({
    selector: "app-account",
    templateUrl: "./account.component.html",
    styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit {
    ngOnInit(): void {
        this.getUserData();
    }

    constructor(
        private authService: AuthenticationService,
        private tokenService: TokenService,
        private userService: UserProfileService,
        private share: SharedService,
        private addressService: AddressService,
        private emailVerif: EmailVerificationService,
        private dialog: MatDialog,
        private pmService: PaymentMethodService
    ) { }

    user: any;

    addresses: any;

    emailVerified: boolean = true;

    emailVerificaionString: string = "";

    PaymentMethods: any;

    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

    selectedFile: File | null = null;

    personalInfoForm = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        username: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
        description: new FormControl(''),
        birthDate: new FormControl(''),
        profession: new FormControl('')
    });

    updatePasswordForm = new FormGroup({
        oldPassword: new FormControl('', Validators.required),
        newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    });

    updateErrMessage: string = "";
    updateSuccessMessage: string = "";
    updatePasswordErrMessage: string = "";
    shippingAddress: any;
    billingAddress: any;

    getUserData() {
        this.userService.getByEmail(this.tokenService.extractUsername()).subscribe({
            next: (value: any) => {
                console.log(value);
                this.user = value;
                this.patchUserData();
                this.getUserAddresses(this.user.id_user);
                this.checkEmailVerified(this.user.email);
                this.getUserPaymentMethods(this.user.id_user);
            },
            error: (err: any) => {
                //window.location.replace("/");
            },
            complete: () => {
                console.log("Complete!");
            }
        });
    }

    getUserAddresses(id: number) {
        this.addressService.getAdressesByIdUser(id).subscribe((data: any) => {
            this.addresses = data;
            this.addresses.forEach((add: any) => {
                if (add.addressType == "ShippingAddress") {
                    this.shippingAddress = add;
                } else if (add.addressType == "BillingAddress") {
                    this.billingAddress = add;
                }
            });
        });
    }

    getUserPaymentMethods(id: number) {
        this.pmService.getAllByUserId(id).subscribe((data: any) => this.PaymentMethods = data);
    }

    checkEmailVerified(email: string) {
        this.emailVerif.isVerified(email).subscribe({
            next: () => {
                this.emailVerified = true;
            },
            error: () => {
                this.emailVerified = false;
                this.emailVerificaionString = "Account not verified please check your email!";
            }
        });
    }

    updateProfilePicture() {
        // Create an invisible file input
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.style.display = 'none';

        // Set the accept attribute to allow only image files
        fileInput.accept = 'image/*';

        // Append the file input to the document
        document.body.appendChild(fileInput);

        // Trigger the click event on the file input
        fileInput.click();

        // Listen for the change event on the file input
        fileInput.addEventListener('change', (event) => {
            const fileList: FileList | null = (event.target as HTMLInputElement).files;
            if (fileList && fileList.length > 0) {
                this.selectedFile = fileList[0];
                this.saveProfilePicture(this.selectedFile);
            }

            // Remove the file input from the document
            document.body.removeChild(fileInput);
        });
    }

    saveProfilePicture(image: File) {
        let formdata = new FormData();
        formdata.append('file', image);
        this.userService.addProfilePicture(this.user.id_user, formdata).subscribe({
            next: () => {
                window.location.reload();
            },
            error: () => {
                alert("Error while updating profile picture");
            }
        });
    }

    patchUserData() {
        this.personalInfoForm.patchValue({
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            username: this.user.username,
            email: this.user.email,
            phoneNumber: this.user.phoneNumber,
            description: this.user.description,
            birthDate: this.user.birthDate,
            profession: this.user.profession
        });
    }

    updateUserData() {
        if (this.personalInfoForm.valid) {
            this.userService.updateUserData(this.personalInfoForm.value, this.user.id_user).subscribe({
                next: (value: any) => {
                    console.log(value);
                    window.location.reload();
                },
                error: (err) => {
                    console.log(err);
                    this.share.errorMessageObservable.subscribe(value => this.updateErrMessage = value);
                }
            });
        } else {
            if (this.personalInfoForm.get('email')!.hasError('email')) {
                this.updateErrMessage = "Wrong email format";
            } else if (this.personalInfoForm.get('phoneNumber')!.hasError('pattern')) {
                // Change this line to check for a custom error message associated with the pattern validator
                this.updateErrMessage = "Phone number must be 10 digits long";
            } else {
                this.updateErrMessage = "You didn't fill a required field";
            }
        }
    }

    updatePassword() {
        if (this.updatePasswordForm.valid) {
            this.userService.updateUserPassword(this.updatePasswordForm.value, this.user.id_user).subscribe({
                next: () => {
                    this.updateSuccessMessage = "Password updated successfully";
                },
                error: () => {
                    this.share.errorMessageObservable.subscribe(value => this.updatePasswordErrMessage = value);
                }
            });
        } else {
            if (this.updatePasswordForm.get('newPassword')!.hasError('minlength') || this.updatePasswordForm.get('confirmPassword')!.hasError('minlength')) {
                this.updatePasswordErrMessage = 'Password is too short';
            } else {
                this.updatePasswordErrMessage = 'All fields are required';
            }
        }
    }

    openAddPaymentMethodDialog() {
        this.dialog.open(AddUpdatePaymentMethodComponent, {
            maxWidth: '400px'
        });
    }

    openUpdatePaymentMethodDialog(paymentMethod: any) {
        this.dialog.open(AddUpdatePaymentMethodComponent, {
            maxWidth: "400px",
            data: { pm: paymentMethod }
        });
    }

    deletePaymentMethod(id: number) {
        this.pmService.deletePaymentMethod(id).subscribe({
            next: () => {
                this.getUserPaymentMethods(this.user.id_user);
            },
            error: () => {
                alert("Error");
            }
        });
    }

}
