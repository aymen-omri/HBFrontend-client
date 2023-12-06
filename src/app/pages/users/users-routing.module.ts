import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountComponent } from "./account/account.component";
import { BecomeVendorComponent } from "./become-vendor/become-vendor.component";
import { BecomeConsultantComponent } from "./become-consultant/become-consultant.component";

const routes: Routes = [
    {
        path: "account",
        component: AccountComponent,
    },
    {
        path: "become-vendor",
        component: BecomeVendorComponent
    },
    {
        path: "become-consultant",
        component: BecomeConsultantComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsersRoutingModule { }
