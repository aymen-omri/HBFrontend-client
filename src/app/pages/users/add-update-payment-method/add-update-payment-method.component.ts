import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TextMaskModule } from 'angular2-text-mask';
import { PaymentMethodService } from 'src/app/core/services/PaymentMethod.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-update-payment-method',
  templateUrl: './add-update-payment-method.component.html',
  styleUrls: ['./add-update-payment-method.component.scss'],
})
export class AddUpdatePaymentMethodComponent implements OnInit {
  ngOnInit(): void {
    this.patchValuesForUpdate();
    this.getUser();
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private share: SharedService,
    private pmService: PaymentMethodService,
    private tokenService: TokenService,
    private userService: UserProfileService
  ) { }

  formGroup = new FormGroup({
    provider: new FormControl('', Validators.required),
    accountNumber: new FormControl('', Validators.required),
    expiryDate: new FormControl('', Validators.required)
  });

  user: any;

  errMessage: string = "";

  update: boolean = false;
  add: boolean = true;

  getUser() {
    this.userService.getByEmail(this.tokenService.extractUsername()).subscribe((data: any) => this.user = data);
  }

  patchValuesForUpdate() {
    console.log(this.data);
    if (this.data && this.data.pm) {
      this.formGroup.patchValue({
        provider: this.data.pm.provider,
        accountNumber: this.data.pm.accountNumber,
        expiryDate: this.data.pm.expiryDate
      });
      this.update = true;
      this.add = false;
    } else {
      this.update = false;
      this.add = true;
    }
  }

  addPaymentMethod() {
    if (this.formGroup.valid) {
      let paymentMethod = {
        provider: this.formGroup.value['provider'],
        accountNumber: this.formGroup.value['accountNumber'],
        expiryDate: this.formGroup.value['expiryDate'],
        user: {
          id_user: this.user.id_user
        }
      }
      this.pmService.insertPaymentMethod(paymentMethod).subscribe({
        next: () => {
          window.location.reload();
        },
        error: () => {
          this.share.errorMessageObservable.subscribe(message => this.errMessage = message);
        }
      });
    } else {
      this.errMessage = "All fields are required!";
    }
  }

  updatePaymentMethod() {
    if (this.formGroup.valid) {
      this.pmService.updatePaymentMethod(this.user.id_user, this.formGroup.value).subscribe({
        next: () => {
          window.location.reload();
        },
        error: () => {
          this.share.errorMessageObservable.subscribe(message => this.errMessage = message);
        }
      });
    } else {
      this.errMessage = 'Please fill all the fields';
    }
  }

}
