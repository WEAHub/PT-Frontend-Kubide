import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { State } from '../../store/heroes.reducer';
import * as heroesActions from '../../store/heroes.actions';
import { getHeroDetail, getHeroDetailComics, getHeroDetailLoading, getHeroDetailSeries } from '../../store/heroes.selectors';


@Component({
  selector: 'app-heroes-detail',
  templateUrl: './heroes-detail.component.html',
  styleUrls: ['./heroes-detail.component.scss']
})

export class HeroesDetailComponent {

  getHeroDetail$ = this.store.select(getHeroDetail)
  getHeroDetailLoading$ = this.store.select(getHeroDetailLoading)
  getHeroDetailComics$ = this.store.select(getHeroDetailComics)
  getHeroDetailSeries$ = this.store.select(getHeroDetailSeries)
  carrouselResponsive = [
    {
      breakpoint: '1920px',
      numVisible: 4,
      numScroll: 2
    },
    {
      breakpoint: '1280px',
      numVisible: 4,
      numScroll: 2
    },
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 2
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(
    private store: Store<{ heroes: State }>,
    private route: ActivatedRoute,
    private router: Router,
  )
  { 
    this.loadHero();
  }

  loadHero() {
    const heroId = this.route.snapshot.paramMap.get('id')

    if(heroId) {
      this.store.dispatch(heroesActions.heroesDetail({ heroId }))
    }

  }

  returnToHeroes() {
    this.router.navigate(['/heroes'])
  }


}
