import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ICharacter } from 'src/app/modules/heroes/models/heroes-api.model';
import { ITeamCharacter } from '../../models/team.model';
import { TeamState } from '../../store/entities/team.entity';
import * as heroesActions from '../../../heroes/store/heroes.actions';
import * as teamActions from '../../store/team.actions';
import * as teamSelectors from '../../store/team.selectors';
import { combineLatest, forkJoin, take } from 'rxjs';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})

export class TeamListComponent {

  getTeam$ = this.store.select(teamSelectors.getTeam)
  getTeamName$ = this.store.select(teamSelectors.getTeamName)
  getTeamDescription$ = this.store.select(teamSelectors.getTeamDescription)

  modifyHeroDialogOpts = {
    hero: <ITeamCharacter>{},
    visible: false,
  }

  modifyTeamDialogOpts = {
    data: {
      name: '',
      description: '',
    },
    visible: false,
  }

  teamForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]]
  })

  constructor(
    private store: Store<{ heroes: TeamState }>,
    private messageService: MessageService,
    private router: Router,
    private fb: FormBuilder
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
    this.store.dispatch(teamActions.teamLocalSave())
  }

  showMessage(message: string, title: string = 'Loading', severity: string = ''): void {
    this.messageService.clear('br');
    this.messageService.add({key: 'br', severity, summary: title, detail: message});
  }

  modifyHero(hero: ITeamCharacter): void {
    this.modifyHeroDialogOpts.hero = hero;
    this.modifyHeroDialogOpts.visible = true;
  }
  
  modifyTeam(): void {
    combineLatest(
      this.store.select(teamSelectors.getTeamName),
      this.store.select(teamSelectors.getTeamDescription)
    )
    .pipe(take(1))
    .subscribe(([name, description]) => {
      
      this.modifyTeamDialogOpts = {
        visible: true,
        data: {
          name, 
          description
        }
      }

    })
  
  }

  onModifyHeroDialogClose(event: boolean) {
    this.modifyHeroDialogOpts.visible = event;
    this.saveTeam();
  }

  onModifyTeamDialogClose(event: boolean) {
    this.modifyTeamDialogOpts.visible = event;
    this.saveTeam();
  }

  goHeroDetails(hero: ICharacter): void {
    this.router.navigate(['/heroes/' + hero.id])
  }

}
