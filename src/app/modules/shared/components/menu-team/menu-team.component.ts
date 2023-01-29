import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ICharacter } from '@modules/heroes/models/heroes-api.model';
import { getTeam } from '@modules/team/store/team.selectors';

@Component({
  selector: 'app-menu-team',
  templateUrl: './menu-team.component.html',
  styleUrls: ['./menu-team.component.scss']
})

export class CoreMenuTeamComponent {

  @Input() mobile: boolean = false 
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
