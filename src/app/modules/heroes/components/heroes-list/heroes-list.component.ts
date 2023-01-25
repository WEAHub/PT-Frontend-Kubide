import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { skip, Subscription, take } from 'rxjs';
import { ConfigService } from 'src/app/modules/shared/services/config/config.service';
import { ICharacter } from '../../models/heroes-api.model';

import * as heroesActions from '../../store/heroes.actions';
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
  }

  loadHeroes(): void {
    this.store.dispatch(heroesActions.heroesLoad({ offset: 0 }))
  }

  onScroll(): void {
    this.store.select(getHeroesCount)
    .pipe(take(1))
    .subscribe(count => {
      if(this.totalHeroes > count) {
        this.store.dispatch(heroesActions.heroesLoad({ offset: count }))
      }
    })
  }

  goHeroDetails(hero: ICharacter) {
    this.router.navigate(['heroes/' + hero.id])
  }

}
