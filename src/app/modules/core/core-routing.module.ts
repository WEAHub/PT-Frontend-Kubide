import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreHomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'heroes'
  },
  {
    path: 'home',
    component: CoreHomeComponent
  },
  {
    path: 'heroes',
    loadChildren: () => import('../heroes/heroes.module').then(m => m.HeroesModule)
	},
  {
    path: 'team',
    loadChildren: () => import('../team/team.module').then(m => m.TeamModule)
	}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class CoreRoutingModule { }
