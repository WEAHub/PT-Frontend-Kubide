import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../store/heroes.reducer';
import * as heroesActions from '../../store/heroes.actions';
import { getHeroesSearchLoading, getHeroesSearchTerm } from '../../store/heroes.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-heroes-search',
  templateUrl: './heroes-search.component.html',
  styleUrls: ['./heroes-search.component.scss']
})

export class HeroesSearchComponent implements OnDestroy {

  searchLoading$ = this.store.select(getHeroesSearchLoading);
  searchTerm$ = this.store.select(getHeroesSearchTerm);
  searchTermSub: Subscription = this.searchTerm$
  .subscribe(term => this.term = term)

  term!: string;
  
  searchForm: FormGroup = this.fb.group({
    searchTerm: [this.term]
  })

  constructor(
    private fb: FormBuilder,
    private store: Store<{ heroes: State }>,
  )
  { }

  ngOnDestroy(): void {
    this.searchTermSub.unsubscribe()
  }

  onSearchChange() {
    const term = this.searchForm.get('searchTerm')?.value ?? ''

    if(term.length) {
      this.store.dispatch(heroesActions.heroesSearch({ term }))
    }
    else {
      this.store.dispatch(heroesActions.heroesSearchClean());
    }
  }

}
