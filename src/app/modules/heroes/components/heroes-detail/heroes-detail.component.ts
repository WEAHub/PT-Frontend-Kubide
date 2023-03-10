import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Subscription, take } from 'rxjs';

import { ConfigService } from '@shared/services/config/config.service';
import { State } from '../../store/heroes.reducer';
import { ICharacter } from '../../models/heroes-api.model';

import * as heroesActions from '../../store/heroes.actions';
import * as heroesSelectors from '../../store/heroes.selectors';
import * as teamActions from '../../../team/store/team.actions';
import * as teamSelectors from '../../../team/store/team.selectors';

@Component({
  selector: 'app-heroes-detail',
  templateUrl: './heroes-detail.component.html',
  styleUrls: ['./heroes-detail.component.scss']
})

export class HeroesDetailComponent implements OnDestroy {

  heroId!: string

  getHeroDetail$ = this.store.select(heroesSelectors.getHeroDetail)
  getHeroDetailLoading$ = this.store.select(heroesSelectors.getHeroDetailLoading)
  getHeroDetailComics$ = this.store.select(heroesSelectors.getHeroDetailComics)
  getHeroDetailSeries$ = this.store.select(heroesSelectors.getHeroDetailSeries)
  getHeroError$ = this.store.select(heroesSelectors.getHeroDetailError)

  carrouselResponsive = [
    { breakpoint: '1920px', numVisible: 4, numScroll: 2 },
    { breakpoint: '1280px', numVisible: 4, numScroll: 2 },
    { breakpoint: '1024px', numVisible: 3, numScroll: 2 },
    { breakpoint: '768px', numVisible: 2, numScroll: 2 },
    { breakpoint: '560px', numVisible: 1, numScroll: 2 },
  ];

  paramSub: Subscription = this.route.params.subscribe(params => {
    this.heroId = params['id']
    this.loadHero();
  }); 
    
  constructor(
    private configService: ConfigService,
    private store: Store<{ heroes: State }>,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
  )
  { }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe()
  }

  loadHero() {
    
    if(this.heroId) {
      this.store.dispatch(heroesActions.heroesDetail({ heroId: this.heroId }))
    }

  }

  returnToHeroes() {
    this.router.navigate(['/heroes'])
  }

  addTeamHero(hero: ICharacter): void {
    this.store.select(teamSelectors.getTeamCount)
    .pipe(take(1))
    .subscribe(count => {
      const maxTeam = this.configService.appMaxTeam
      if(count < maxTeam) {
        this.store.dispatch(teamActions.teamAddHero({ hero }))
        this.store.dispatch(heroesActions.heroSetTeam({ 
          id: hero.id.toString(), 
          changes: {
            inTeam: true
          }
        }))
        this.saveTeam()
        this.showMessage('Hero added to team successfully!', "Team modified", "success")
      }
      else {
        this.showMessage('The team can only have 6 heroes.', 'Max. team reached', 'error')
      }
    })
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

}
