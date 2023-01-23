import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as heroesActions from '../../store/heroes.actions';
import { State } from '../../store/heroes.reducer';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit {

  constructor(
    private store: Store<{ heroes: State }>,
  ) {
    
  }

  ngOnInit(): void {
    this.loadHeroes();
  }

  loadHeroes(): void {
    this.store.dispatch(heroesActions.heroesLoad());
  }
}
