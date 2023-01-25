
import { createReducer, on  } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ICharacter, IMarvelResponseData } from "../models/heroes-api.model";
import * as heroesActions from "./heroes.actions";
import { HeroesState, heroesAdapter } from "./entities/heroes.entity";
import { searchAdapter, SearchState } from "./entities/heroes-search.entity";

const featureName = "heroesStore";

interface State {
  heroes: HeroesState,
  search: SearchState,
  team: [];
  heroDetail: ICharacter;
  heroDetailLoading: boolean;
  heroDetailError: string;
}

const initialState: State = {
  heroes: heroesAdapter.getInitialState({
    loading: false,
    maxHeroesToLoad: 0,
    error: '',
  }),
  search: searchAdapter.getInitialState({
    searching: false,
    searchTerm: '',
    searchLoading: false,
  }),
  team: [],
  heroDetail: <ICharacter>{},
  heroDetailLoading: false,
  heroDetailError: '',
};


const reducer = createReducer(
  initialState,
  // LIST
  on(heroesActions.heroesLoad, (state) => {
    return {
      ...state,
      loading: true,
      error: '',
    }
  }),
  on(heroesActions.heroesLoadSuccess, (state, { heroes, total }) => {
    return {
      ...state,
      heroes: heroesAdapter.addMany(heroes, { 
        ...state.heroes,
        loading: false,
        maxHeroesToLoad: total,
        error: '',
      }),
    }
  }),
  on(heroesActions.heroesLoadFail, (state, { error }) => {
    return {
      ...state,
      heroes: heroesAdapter.removeAll({ ...state.heroes}),
      loading: false,
      error: error.message,
    }
  }),
  // SEARCH
  on(heroesActions.heroesSearch, (state, { term }) => {
    return {
      ...state,
      search: {
        ...state.search,
        searchTerm: term,
        searchLoading: true,
        searching: true,
      }
    }
  }),
  on(heroesActions.heroesSearchSuccess, (state, { heroes }) => {
    return {
      ...state,
      search: searchAdapter.addMany(heroes, {
        ...state.search,
        searchLoading: false,
      })
    }
  }),
  on(heroesActions.heroesSearchFail, (state, { error }) => {
    return {
      ...state,
      search: {
        ...state.search,
        searchLoading: false,
      },
      error: error.message,
    }
  }),
  on(heroesActions.heroesSearchClean, (state) => {
    return {
      ...state,
      search: {
        ...state.search,
        searchTerm: '',
        searching: false,
      }
    }
  }),
  // DETAIL
  on(heroesActions.heroesDetail, (state) => {
    return {
      ...state,
      heroDetailLoading: true,
    }
  }),
  on(heroesActions.heroesDetailSuccess, (state, { hero }) => {
    return {
      ...state,
      heroDetail: hero,
      heroDetailLoading: false
    }
  }),
  on(heroesActions.heroesDetailFail, (state, { error }) => {
    return {
      ...state,
      heroDetailError: error.message,
      heroDetailLoading: false
    }
  })
)

const {
  selectAll: selectHeroesAll,
  selectTotal: selectHeroesTotal,
} = heroesAdapter.getSelectors();

const {
  selectAll: selectSearchAll,
  selectTotal: selectSearchTotal,
} = heroesAdapter.getSelectors();

const selectHeroesState = (state: State) => state.heroes;
const selectSearchState = (state: State) => state.search;

export {
  featureName,
  State,
  reducer,
  selectHeroesAll,
  selectHeroesTotal,
  selectHeroesState,
  selectSearchAll,
  selectSearchTotal,
  selectSearchState,
}