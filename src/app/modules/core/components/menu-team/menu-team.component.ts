import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ICharacter } from 'src/app/modules/heroes/models/heroes-api.model';
import { getTeam } from 'src/app/modules/team/store/team.selectors';

@Component({
  selector: 'app-menu-team',
  templateUrl: './menu-team.component.html',
  styleUrls: ['./menu-team.component.scss']
})

export class CoreMenuTeamComponent {

  getTeam$ = this.store.select(getTeam)

  constructor(
    private store: Store,
    private router: Router
  ) {
    
  }

  goHeroDetails(hero: ICharacter): void {
    this.router.navigate(['/heroes/' + hero.id], {

      onSameUrlNavigation: 'reload'
    })
  }

}
