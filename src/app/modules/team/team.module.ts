import { NgModule } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TeamRoutingModule } from './team-routing.module';
import { TeamListComponent } from './components/team-list/team-list.component';

import * as fromTeam from './store/team.reducer'
import { TeamService } from './services/team.service';
import { SharedModules } from '../shared';
import { TeamEffects } from './store/team.effects';
import { StorageService } from './services/storage.service';
import { ModifyHeroComponent } from './components/modify-hero/modify-hero.component';
import { ModifyTeamComponent } from './components/modify-team/modify-team.component';

@NgModule({
  declarations: [
    TeamListComponent,
    ModifyHeroComponent,
    ModifyTeamComponent
  ],
  providers: [
    TeamService,
    StorageService
  ],
  imports: [
    SharedModules,
    TeamRoutingModule,
    StoreModule.forFeature(
      fromTeam.featureName, 
      fromTeam.reducer
    ),
    EffectsModule.forFeature([TeamEffects]) 
  ]
})

export class TeamModule { } 
