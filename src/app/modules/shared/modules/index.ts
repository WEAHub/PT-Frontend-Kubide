import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { PrimeNGModule } from "./primeng/primeng.module";

@NgModule({
  imports: [
    HttpClientModule,
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    InfiniteScrollModule,
    PrimeNGModule,
    FormsModule
  ]
})

export class SharedModulesModule { }