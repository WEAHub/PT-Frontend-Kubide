import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SearchState } from "./entities/heroes-search.entity";
import { HeroesState } from "./entities/heroes.entity";

import * as fromHeroes from "./heroes.reducer";

const heroesState = createFeatureSelector<fromHeroes.State>(fromHeroes.featureName);

const selectHeroState = createSelector(heroesState, fromHeroes.selectHeroesState);
const selectSearchState = createSelector(heroesState, fromHeroes.selectSearchState);

const getHeroes = createSelector(
  selectHeroState,
  fromHeroes.selectHeroesAll
)

const getHeroesCount = createSelector(
  selectHeroState,
  fromHeroes.selectHeroesTotal
)

const getHeroesTotal = createSelector(
  selectHeroState,
  (state: HeroesState) => state.maxHeroesToLoad
)

const getHeroesLoading = createSelector(
  selectHeroState,
  (state: HeroesState) => state.loading
)

const getHeroesSearchTerm = createSelector(
  selectSearchState,
  (state: SearchState) => state.term
)

const getHeroesSearch = createSelector(
  selectSearchState,
  fromHeroes.selectSearchAll
)

const getHeroesSearchLoading = createSelector(
  selectSearchState,
  (state: SearchState) => state.loading
)

const getHeroesSearchStatus = createSelector(
  selectSearchState,
  (state: SearchState) => state.searching
)

export {
  getHeroes,
  getHeroesLoading,
  getHeroesCount,
  getHeroesTotal,
  getHeroesSearch,
  getHeroesSearchTerm,
  getHeroesSearchLoading,
  getHeroesSearchStatus
}