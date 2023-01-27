import { Dictionary } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ICharacter } from "../models/heroes-api.model";
import { SearchState } from "./entities/heroes-search.entity";
import { HeroesState } from "./entities/heroes.entity";

import * as fromHeroes from "./heroes.reducer";

const heroesState = createFeatureSelector<fromHeroes.State>(fromHeroes.featureName);

const selectHeroState = createSelector(heroesState, fromHeroes.selectHeroesState);
const selectSearchState = createSelector(heroesState, fromHeroes.selectSearchState);

/**
 *  Heroes List
 *  Path: /heroes
 */

const getHeroes = createSelector(
  selectHeroState,
  fromHeroes.selectHeroesAll
)
/* export const selectHeroesEntities = createSelector(
  selectHeroState,
  fromHeroes.selectHeroesEntities
);

const getHeroEntity = (id: any) => createSelector(
  selectHeroesEntities,
  (entities) => entities[id]
);
 */

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


/**
 *  Heroes Search
 *  Path: /heroes
 */

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


/**
 *  Heroes Details
 *  Path: /heroes/:id
 */

const getHeroDetail = createSelector(
  heroesState,
  (state: fromHeroes.State) => state.heroDetail.hero
)

const getHeroDetailLoading = createSelector(
  heroesState,
  (state: fromHeroes.State) => state.heroDetail.loading
)

const getHeroDetailError = createSelector(
  heroesState,
  (state: fromHeroes.State) => state.heroDetail.error
)

const getHeroDetailComics = createSelector(
  heroesState,
  (state: fromHeroes.State) => state.heroDetail.comics
)

const getHeroDetailSeries = createSelector(
  heroesState,
  (state: fromHeroes.State) => state.heroDetail.series
)

export {
  getHeroes,

  getHeroesLoading,
  getHeroesCount,
  getHeroesTotal,

  getHeroesSearch,
  getHeroesSearchTerm,
  getHeroesSearchLoading,
  getHeroesSearchStatus,

  getHeroDetail,
  getHeroDetailLoading,
  getHeroDetailError,
  getHeroDetailComics,
  getHeroDetailSeries
}