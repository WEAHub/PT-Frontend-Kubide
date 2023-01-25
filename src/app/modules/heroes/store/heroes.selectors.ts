import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromHeroes from "./heroes.reducer";

const heroesState = createFeatureSelector<fromHeroes.State>(fromHeroes.featureName);

const getHeroes = createSelector(
  heroesState,
  fromHeroes.selectAll
)

const getHeroesCount = createSelector(
  heroesState,
  fromHeroes.selectTotal
)

const getHeroesTotal = createSelector(
  heroesState,
  (state: fromHeroes.State) => state.maxHeroesToLoad
)

const getHeroesLoading = createSelector(
  heroesState,
  (state: fromHeroes.State) => state.loading
)

const getHeroesSearchTerm = createSelector(
  heroesState,
  (state: fromHeroes.State) => state.searchTerm
)

const getHeroesSearch = createSelector(
  heroesState,
  (state: fromHeroes.State) => state.searchResults
)

const getHeroesSearchLoading = createSelector(
  heroesState,
  (state: fromHeroes.State) => state.searchLoading
)

const getHeroesSearchStatus = createSelector(
  heroesState,
  (state: fromHeroes.State) => state.searching
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