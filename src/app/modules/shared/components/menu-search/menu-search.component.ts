import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounce, interval, map, Observable, Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import * as heroesActions from '@modules/heroes/store/heroes.actions';
import * as heroesSelectors from '@modules/heroes/store/heroes.selectors';

@Component({
  selector: 'app-menu-search',
  templateUrl: './menu-search.component.html',
  styleUrls: ['./menu-search.component.scss']
})

export class CoreMenuSearchComponent implements OnInit, OnDestroy {

  searchLoading$ = this.store.select(heroesSelectors.getHeroesSearchLoading);
  searchTerm$ = this.store.select(heroesSelectors.getHeroesSearchTerm);

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
    private store: Store,
    private router: Router,
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
      
      if(this.router.url !== '/heroes') {
          this.router.navigate(['/heroes'])
      }

    }
    else {
      this.store.dispatch(heroesActions.heroesSearchClean());
    }
  }

}
