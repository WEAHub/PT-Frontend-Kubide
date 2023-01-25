import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../../store/heroes.reducer';

import * as heroesActions from '../../store/heroes.actions';

@Component({
  selector: 'app-heroes-detail',
  templateUrl: './heroes-detail.component.html',
  styleUrls: ['./heroes-detail.component.scss']
})

export class HeroesDetailComponent {



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


}
