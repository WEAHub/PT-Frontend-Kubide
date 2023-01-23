import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { SharedServicesModules } from './services'

@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    CommonModule,
    SharedServicesModules
  ]
})

export class SharedModules { }