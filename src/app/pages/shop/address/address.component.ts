import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';

// Data Get
import { addressdata } from './data';
import { AddressModel } from './address.model';
import { AddressService } from 'src/app/core/services/Address.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserProfileService } from 'src/app/core/services/user.service';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  adresses: any;
  addressmodal: boolean = false;
  removemodal: boolean = false;
  addressForm!: UntypedFormGroup;
  submitted: any;
  econtent: any;
  removeadressid: any;
  errMessage: string = "";

  constructor(private formBuilder: UntypedFormBuilder,
    private addressService: AddressService,
    private tokenService: TokenService,
    private userService: UserProfileService,
    private share: SharedService
  ) {
    //this.adresses = addressdata
  }

  ngOnInit(): void {

    /**
       * BreadCrumb
       */
    this.breadCrumbItems = [
      { label: 'Shop' },
      { label: 'Address', active: true }
    ];

    this.getAllCountries();
    this.getUserData();

    /**
    * Form Validation
    */
    this.addressForm = this.formBuilder.group({
      addressLine1: ['', [Validators.required]],
      addressLine2: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      addressType: ['', [Validators.required]]
    });
  }

  countries: any;
  user: any;
  getAllCountries() {
    this.addressService.getAllCountries().subscribe(data => this.countries = data);
  }

  getUserData() {
    this.userService.getByEmail(this.tokenService.extractUsername()).subscribe((data: any) => {
      this.user = data;
      this.getUserAdresses(this.user.id_user);
    });
  }

  getUserAdresses(id: number) {
    this.addressService.getAdressesByIdUser(id).subscribe((data: any) => this.adresses = data);
  }

  showDialog() {
    this.submitted = false;
    this.addressmodal = true;
    setTimeout(() => {
      var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
      modelTitle.innerHTML = 'Add New Address';
      var updateBtn = document.getElementById('addNewAddress') as HTMLAreaElement;
      updateBtn.innerHTML = "Add";
    }, 10);
    this.addressForm = this.formBuilder.group({
      addressLine1: '',
      addressLine2: '',
      city: '',
      postalCode: '',
      country: '',
      addressType: ''
    });
  }

  // Edit Adress
  EditDialog(id: any) {
    this.submitted = false;
    this.addressmodal = true;
    setTimeout(() => {
      var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
      modelTitle.innerHTML = 'Edit Address';
      var updateBtn = document.getElementById('addNewAddress') as HTMLAreaElement;
      updateBtn.innerHTML = "Update";
    }, 10);
    this.econtent = this.adresses[id];
    console.log(this.econtent);
    this.addressForm.controls['addressLine1'].setValue(this.econtent.addressLine1);
    this.addressForm.controls['addressLine2'].setValue(this.econtent.addressLine2);
    this.addressForm.controls['city'].setValue(this.econtent.city);
    this.addressForm.controls['postalCode'].setValue(this.econtent.postalCode);
    this.addressForm.controls['country'].setValue(this.econtent.country.id_country);
    this.addressForm.controls['addressType'].setValue(this.econtent.addressType);
  }

  // Remove Adress
  RemoveDialog(id: any) {
    this.removemodal = true;
    this.removeadressid = id
  }

  hideMessage() {
    setTimeout(() => {
      this.errMessage = '';
    }, 6000);
  }

  /**
 * Form data get
 */
  get form() {
    return this.addressForm.controls;
  }

  /**
 * Save user
 */
  saveAddress() {
    if (this.addressForm.valid) {
      let address = {
        addressLine1: this.addressForm.value.addressLine1,
        addressLine2: this.addressForm.value.addressLine2,
        city: this.addressForm.value.city,
        postalCode: this.addressForm.value.postalCode,
        addressType: this.addressForm.value.addressType,
        country: {
          id_country: this.addressForm.value.country
        }
      }
      if (!this.econtent) {
        this.addressService.saveAddress(address, this.user.id_user).subscribe({
          next: (res: any) => {
            console.log(res);
            this.getUserAdresses(this.user.id_user);
            this.addressmodal = false;
          },
          error: () => {
            this.share.errorMessageObservable.subscribe(message => {
              this.errMessage = message;
              this.hideMessage();
            });
          }
        });
      } else {
        this.addressService.updateAddress(this.econtent.id_address, this.addressForm.value.country, this.user.id_user, address).subscribe({
          next: () => {
            this.getUserAdresses(this.user.id_user);
            this.addressmodal = false;
          },
          error: (err: any) => {
            this.share.errorMessageObservable.subscribe(message => {
              this.errMessage = message;
              this.hideMessage();
            });
          }
        });
      }
    } else {
      this.errMessage = "You didn't fill a required field!"
    }
  }

  // Delete Adress
  deleteaddress() {
    this.addressService.deleteAddress(this.removeadressid).subscribe({
      next: () => {
        this.getUserAdresses(this.user.id_user);
        this.removemodal = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  closeModal() {
    this.removemodal = false;
    this.addressmodal = false;
  }
}
