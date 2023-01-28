import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../store/heroes.reducer';
import * as heroesActions from '../../store/heroes.actions';
import { getHeroesSearchLoading, getHeroesSearchTerm } from '../../store/heroes.selectors';
import { debounce, interval, map, Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-heroes-search',
  templateUrl: './heroes-search.component.html',
  styleUrls: ['./heroes-search.component.scss']
})

export class HeroesSearchComponent implements OnInit, OnDestroy {

  searchLoading$ = this.store.select(getHeroesSearchLoading);
  searchTerm$ = this.store.select(getHeroesSearchTerm);

  searchTermSub: Subscription = this.searchTerm$
  .subscribe(term => this.term = term)

  searchSubject = new Subject<string>()

  searchEvent$: Observable<void> = this.searchSubject.pipe(
    debounce(() => interval(350)),
    map(term => this.doSearch(term))
  );

  searchSub: Subscription = this.searchEvent$.subscribe();

  term!: string;
  
  searchForm: FormGroup = this.fb.group({
    searchTerm: [this.term]
  })

  constructor(
    private fb: FormBuilder,
    private store: Store<{ heroes: State }>,
  )
  { }

  ngOnInit(): void {

    
  }

  ngOnDestroy(): void {
    this.searchTermSub.unsubscribe()
    this.searchSub.unsubscribe();
  }

  onSearchChange(): void {
    const term = this.searchForm.get('searchTerm')?.value ?? ''
    this.searchSubject.next(term)
  }

  doSearch(term: string): void {
    if(term.length) {
      this.store.dispatch(heroesActions.heroesSearch({ term }))
    }
    else {
      this.store.dispatch(heroesActions.heroesSearchClean());
    }
  }

}
