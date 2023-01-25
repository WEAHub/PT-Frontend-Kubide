import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HeroesDetailComponent } from './components/heroes-detail/heroes-detail.component';
import { HeroesComponent } from './components/heroes/heroes.component';

const routes: Routes = [
  { 
		path: '',
		pathMatch: 'full',
		component: HeroesComponent,
	},
  { 
		path: 'heroes/:id',     
		component: HeroesDetailComponent,
	},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class HeroesRoutingModule { }
