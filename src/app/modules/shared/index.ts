
import { NgModule } from "@angular/core";

import { SharedModulesModule } from "./modules";
import { SharedServicesModule } from './services'

@NgModule({
  exports: [
    SharedModulesModule,
    SharedServicesModule,
  ]
})

export class SharedModules { }