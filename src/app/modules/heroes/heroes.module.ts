import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromHeroes from './store/heroes.reducer';

import { HeroesListComponent } from './components/heroes-list/heroes-list.component';
import { HeroesTeamComponent } from './components/heroes-team/heroes-team.component';
import { HeroesComponent } from './components/heroes/heroes.component'

import { HeroesService } from './services/heroes.service';
import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesEffects } from './store/heroes.effects';

@NgModule({
  declarations: [
    HeroesListComponent,
    HeroesTeamComponent,
    HeroesComponent
  ],
  providers: [
    HeroesService
  ],
  imports: [
    HeroesRoutingModule,
    StoreModule.forFeature(fromHeroes.featureName, fromHeroes.reducer),
    EffectsModule.forFeature([HeroesEffects])
  ]
})

export class HeroesModule { } 
