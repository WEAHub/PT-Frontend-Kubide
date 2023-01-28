import { NgModule } from "@angular/core";
import { SharedModulesModule } from "../modules";
import { CoreMenuSearchComponent } from "./menu-search/menu-search.component";
import { CoreMenuTeamComponent } from "./menu-team/menu-team.component";


@NgModule({
  imports: [
    SharedModulesModule
  ],
  declarations: [
    CoreMenuTeamComponent,
    CoreMenuSearchComponent
  ],
  exports: [
    CoreMenuTeamComponent,
    CoreMenuSearchComponent
  ]
})

export class SharedComponentsModule { }