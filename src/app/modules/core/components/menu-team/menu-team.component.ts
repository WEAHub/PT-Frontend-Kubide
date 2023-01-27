import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getTeam } from 'src/app/modules/team/store/team.selectors';

@Component({
  selector: 'app-menu-team',
  templateUrl: './menu-team.component.html',
  styleUrls: ['./menu-team.component.scss']
})

export class CoreMenuTeamComponent {

  getTeam$ = this.store.select(getTeam)

  constructor(
    private store: Store
  ) {
    
  }

}
