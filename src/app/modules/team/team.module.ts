import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TeamRoutingModule } from './team-routing.module';
import { TeamListComponent } from './components/team-list/team-list.component';

@NgModule({
  declarations: [
    TeamListComponent
  ],
  providers: [
  ],
  imports: [
    TeamRoutingModule,
/*     StoreModule.forFeature(fromHeroes.featureName, fromHeroes.reducer),
    EffectsModule.forFeature([]) */
  ]
})

export class TeamModule { } 
