import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { TeamListComponent } from './components/team-list/team-list.component';

const routes: Routes = [
  { 
		path: 'team', 
		component: TeamListComponent,
	},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class TeamRoutingModule { }
