import { NgModule } from "@angular/core";
import { HeroesModule } from "./heroes/heroes.module";
import { SharedModules } from "./shared";
import { TeamModule } from "./team/team.module";

@NgModule({
  exports: [
    SharedModules,
    HeroesModule,
    TeamModule,
  ]
})

export class Modules { }