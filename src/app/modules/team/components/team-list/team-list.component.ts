import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TeamState } from '../../store/entities/team.entity';
import { getTeam } from '../../store/team.selectors';

import * as heroesActions from '../../../heroes/store/heroes.actions';
import * as teamActions from '../../store/team.actions';
import * as teamSelectors from '../../store/team.selectors';
import { MessageService } from 'primeng/api';
import { ICharacter } from 'src/app/modules/heroes/models/heroes-api.model';
import { take } from 'rxjs';
import { ITeamCharacter } from '../../models/team.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})

export class TeamListComponent {

  getTeam$ = this.store.select(getTeam)

  modifyHeroDialogOpts = {
    hero: <ITeamCharacter>{},
    visible: false,
  }

  constructor(
    private store: Store<{ heroes: TeamState }>,
    private messageService: MessageService,
    private router: Router,
  ) {

  }

  removeFromTeam(hero: ICharacter): void {
    this.store.dispatch(teamActions.teamRemoveHero({heroId: hero.id}))
    this.store.dispatch(heroesActions.heroSetTeam({ 
      id: hero.id.toString(), 
      changes: {
        inTeam: false
      }
    }))
    this.saveTeam()
    this.showMessage('Hero removed!', "Team modified", "warn")
  }

  saveTeam(): void {
    this.store.select(teamSelectors.getTeam)
    .pipe(take(1))
    .subscribe(heroes => {
      this.store.dispatch(teamActions.teamLocalSave({ heroes }))
    })
  }

  showMessage(message: string, title: string = 'Loading', severity: string = ''): void {
    this.messageService.clear('br');
    this.messageService.add({key: 'br', severity, summary: title, detail: message});
  }

  modifyHero(hero: ITeamCharacter) {
    this.modifyHeroDialogOpts.hero = hero;
    this.modifyHeroDialogOpts.visible = true;
  }
  
  onDialogClose(event: boolean) {
    this.modifyHeroDialogOpts.visible = event;
    this.saveTeam();
  }

  goHeroDetails(hero: ICharacter): void {
    this.router.navigate(['/heroes/' + hero.id])
  }

}
