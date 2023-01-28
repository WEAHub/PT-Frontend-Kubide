
import { NgModule } from "@angular/core";

import { SharedComponentsModule } from "./components";
import { SharedModulesModule } from "./modules";
import { SharedPipesModule } from "./pipes";
import { SharedServicesModule } from './services'

@NgModule({
  exports: [
    SharedModulesModule,
    SharedComponentsModule,
    SharedPipesModule,
    SharedServicesModule,
  ]
})

export class SharedModules { }