
import { NgModule } from "@angular/core";

import { SharedModulesModule } from "./modules";
import { SharedPipesModule } from "./pipes/pipes.module";
import { SharedServicesModule } from './services'

@NgModule({
  exports: [
    SharedPipesModule,
    SharedModulesModule,
    SharedServicesModule,
  ]
})

export class SharedModules { }