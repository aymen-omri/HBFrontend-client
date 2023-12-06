import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressService } from 'src/app/core/services/Address.service';
import { VendorService } from 'src/app/core/services/Vendor.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-become-vendor',
  templateUrl: './become-vendor.component.html',
  styleUrls: ['./become-vendor.component.scss']
})
export class BecomeVendorComponent implements OnInit {
  ngOnInit(): void {
    this.getUser();
    this.getAllCountries();
  }

  constructor(
    private tokenService: TokenService,
    private userService: UserProfileService,
    private addressService: AddressService,
    private vendorService: VendorService,
    private share: SharedService
  ) { }
  @ViewChild('fileInput') fileInput!: ElementRef;
  uploadedFiles: any[] = [];
  user: any;
  countries: any[] = [];
  shippingCountries: any[] = [];
  errMessage: string = "";
  basicInfoFormGroup = new FormGroup({
    companyName: new FormControl(''),
    identificationNumber: new FormControl(''),
    vendorDescription: new FormControl('', [Validators.required]),
    shopLink: new FormControl('')
  });
  companyAddressFormGroup = new FormGroup({
    addressLine1: new FormControl('', Validators.required),
    addressLine2: new FormControl(''),
    postalCode: new FormControl('',Validators.required),
    city: new FormControl('',Validators.required),
    country: new FormControl('',Validators.required),
  });

  getUser() {
    this.userService.getByEmail(this.tokenService.extractUsername()).subscribe((data: any) => this.user = data);
  }

  getAllCountries() {
    this.addressService.getAllCountries().subscribe((data: any) => this.countries = data);
  }


  onSelectedFile(event: any) {
    for (const file of event.target.files) {
      this.uploadedFiles.push(file);
    }
  }

  deleteSelectedFile(name: string) {
    for (let i = 0; i < this.uploadedFiles.length; i++) {
      if (this.uploadedFiles[i].name == name) {
        this.uploadedFiles.splice(i, 1);
        break;
      }
    }
    this.fileInput.nativeElement.value = '';
    console.log(this.uploadedFiles);
  }

  showSelectedShippingCountries(event: any) {
    if (event.target) {
      if (!this.shippingCountries.includes(event.target.value)) {
        this.shippingCountries.push(event.target.value);
      }
    }
  }

  deleteShippingCountry(name: string) {
    for (let i = 0; i < this.shippingCountries.length; i++) {
      if (this.shippingCountries[i] == name) {
        this.shippingCountries.splice(i, 1);
        break;
      }
    }
  }

  sendVendorRequest() {
    const formData = new FormData();
    formData.append('id_user', this.user.id_user);
    if (this.basicInfoFormGroup.valid) {
      formData.append('companyName', this.basicInfoFormGroup.value.companyName!);
      formData.append('identificationNumber', this.basicInfoFormGroup.value.identificationNumber!);
      formData.append('vendorDescription', this.basicInfoFormGroup.value.vendorDescription!);
      formData.append('shopLink', this.basicInfoFormGroup.value.shopLink!);
      if (this.companyAddressFormGroup.valid) {
        formData.append('id_country', this.companyAddressFormGroup.value.country!);
        formData.append('city', this.companyAddressFormGroup.value.city!);
        formData.append('postalCode', this.companyAddressFormGroup.value.postalCode!);
        formData.append('addressLine1', this.companyAddressFormGroup.value.addressLine1!);
        formData.append('addressLine2', this.companyAddressFormGroup.value.addressLine2!);
        if (this.uploadedFiles.length != 0) {
          this.uploadedFiles.forEach(file => {
            formData.append("files", file);
          });
          if (this.shippingCountries.length != 0) {
            this.shippingCountries.forEach(country => {
              formData.append("countries", country);
            });
            this.vendorService.sendVendorRequest(formData).subscribe({
              next: (data: any) => {
                alert("Request sent successfully!");
              },
              error: err => {
                this.share.errorMessageObservable.subscribe(msg => this.errMessage = msg);
              }
            })
          } else {
            this.errMessage = "You should at least select one country for shipping";
          }
        } else {
          this.errMessage = "Please upload a document";
        }
      } else {
        this.errMessage = "All company address fields are required, except for Address Line 2";
      }
    } else {
      this.errMessage = "Vendor description is required!";
    }
  }


}
