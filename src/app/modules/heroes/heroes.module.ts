import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromHeroes from './store/heroes.reducer';

import { HeroesComponent } from './components/heroes/heroes.component'
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';
import { HeroesSearchComponent } from './components/heroes-search/heroes-search.component';
import { HeroesDetailComponent } from './components/heroes-detail/heroes-detail.component';

import { HeroesService } from './services/heroes.service';
import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesEffects } from './store/heroes.effects';
import { SharedModules } from '../shared';
import { HeroesDetailComicComponent } from './components/heroes-detail-comic/heroes-detail-comic.component';

@NgModule({
  declarations: [
    HeroesComponent,
    HeroesListComponent,
    HeroesSearchComponent,
    HeroesDetailComponent,
    HeroesDetailComicComponent
  ],
  providers: [
    HeroesService,
  ],
  imports: [
    HeroesRoutingModule,
    SharedModules,
    StoreModule.forFeature(fromHeroes.featureName, fromHeroes.reducer),
    EffectsModule.forFeature([HeroesEffects])
  ]
})

export class HeroesModule { } 
