import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Page Route
import { UsersRoutingModule } from "./users-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

import { TabViewModule } from "primeng/tabview";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


// Component
import { AccountComponent } from "./account/account.component";
import { AddUpdatePaymentMethodComponent } from './add-update-payment-method/add-update-payment-method.component';

@NgModule({
  declarations: [AccountComponent, AddUpdatePaymentMethodComponent],
  imports: [CommonModule, UsersRoutingModule, SharedModule, TabViewModule, NgxMaskDirective, NgxMaskPipe],
  providers: [provideNgxMask()]
})
export class UsersModule { }
