import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TeamState } from '../../store/entities/team.entity';
import { getTeam } from '../../store/team.selectors';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})

export class TeamListComponent {

  getTeam$ = this.store.select(getTeam)

  constructor(
    private store: Store<{ heroes: TeamState }>
  ) {

  }
  
}
