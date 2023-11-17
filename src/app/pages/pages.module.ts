import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CarouselModule } from "primeng/carousel";

// Page Routing
import { PagesRoutingModule } from "./pages-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, PagesRoutingModule, SharedModule, CarouselModule],
})
export class PagesModule { }
