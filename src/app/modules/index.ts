import { NgModule } from "@angular/core";
import { HeroesModule } from "./heroes/heroes.module";
import { SharedModules } from "./shared";

@NgModule({
  exports: [
    SharedModules,
    HeroesModule
  ]
})

export class Modules { }