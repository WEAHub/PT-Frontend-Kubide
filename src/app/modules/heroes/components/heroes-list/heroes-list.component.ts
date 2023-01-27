import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';

import { Subscription, take } from 'rxjs';
import { ConfigService } from 'src/app/modules/shared/services/config/config.service';
import { ICharacter } from '../../models/heroes-api.model';

import * as heroesActions from '../../store/heroes.actions';
import * as teamActions from '../../../team/store/team.actions';
import * as teamSelectors from '../../../team/store/team.selectors';

import { State } from '../../store/heroes.reducer';

import { getHeroes, getHeroesCount, getHeroesLoading, getHeroesSearch, getHeroesSearchLoading, getHeroesSearchStatus, getHeroesSearchTerm, getHeroesTotal } from '../../store/heroes.selectors';


@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit, OnDestroy {
  
  getHeroes$ = this.store.select(getHeroes)
  getHeroesLoading$ = this.store.select(getHeroesLoading)
  getHeroesTotal$ = this.store.select(getHeroesTotal)
  getHeroesSearch$ = this.store.select(getHeroesSearch)
  getHeroesSearchTerm$ = this.store.select(getHeroesSearchTerm)
  getHeroesSearchStatus$ = this.store.select(getHeroesSearchStatus)
  searchLoading$ = this.store.select(getHeroesSearchLoading);
  
  virtualHeroes: ICharacter[] = []
  filteredHeroes: ICharacter[] = []
  totalHeroes!: number
  skeletonList: number[] = new Array(this.configService.apiLimit);

  searching: boolean = false;
  getSearchStatusSub: Subscription = this.getHeroesSearchStatus$
  .subscribe(searching => this.searching = searching)

  getHeroesSub: Subscription = this.getHeroes$
  .subscribe((heroes: ICharacter[]) => {

    if(!heroes.length) return

    if(!this.totalHeroes) {
      this.store.select(getHeroesTotal)
      .pipe(take(1))
      .subscribe(total => this.totalHeroes = total)
    }

    this.virtualHeroes = heroes

  })

  getHeroesSearch: Subscription = this.getHeroesSearch$
  .subscribe((heroes: ICharacter[]) => {
    this.filteredHeroes = heroes
  })

  constructor(
    private configService: ConfigService,
    private router: Router,
    private store: Store<{ heroes: State }>,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    if(!this.virtualHeroes.length) {
      this.loadHeroes();
    }
    else {
      this.store.select(getHeroesSearchTerm)
      .pipe(take(1))
      .subscribe(term => {
        if(term.length) {
          this.store.dispatch(heroesActions.heroesSearch({ term }))
        }
        else {
          this.store.dispatch(heroesActions.heroesSearchClean());
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.getHeroesSub.unsubscribe();
    this.getHeroesSearch.unsubscribe();
    this.getSearchStatusSub.unsubscribe();
  }

  loadHeroes(): void {
    this.store.dispatch(heroesActions.heroesLoad({ offset: 0 }))
  }

  onScroll(): void {
    if(this.searching) return
    this.store.select(getHeroesCount)
    .pipe(take(1))
    .subscribe(count => {
      if(this.totalHeroes > count) {
        this.store.dispatch(heroesActions.heroesLoad({ offset: count }))
        const message = `${count + this.configService.apiLimit} of ${this.totalHeroes} Heroes`
        this.showMessage(message)
      }
    })
  }

  goHeroDetails(hero: ICharacter): void {
    this.router.navigate(['/heroes/' + hero.id])
  }
  
  showMessage(message: string, title: string = 'Loading', severity: string = ''): void {
    this.messageService.clear('br');
    this.messageService.add({key: 'br', severity, summary: title, detail: message});
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
    this.store.select(teamSelectors.getTeam)
    .pipe(take(1))
    .subscribe(heroes => {
      this.store.dispatch(teamActions.teamLocalSave({ heroes }))
    })
  }
}
