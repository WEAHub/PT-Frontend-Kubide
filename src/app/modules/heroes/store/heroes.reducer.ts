
import { createReducer, on  } from "@ngrx/store";
import { ICharacter, IComic, ISerie } from "../models/heroes-api.model";
import * as heroesActions from "./heroes.actions";
import { HeroesState, heroesAdapter } from "./entities/heroes.entity";
import { searchAdapter, SearchState } from "./entities/heroes-search.entity";

const featureName = "heroesStore";

interface State {
  heroes: HeroesState;
  search: SearchState;
  heroDetail: {
    hero: ICharacter;
    comics: IComic[];
    series: ISerie[];
    loading: boolean;
    error: string;
  }
}

const initialState: State = {
  heroes: heroesAdapter.getInitialState({
    loading: false,
    maxHeroesToLoad: 0,
    error: '',
  }),
  search: searchAdapter.getInitialState({
    loading: false,
    searching: false,
    term: '',
  }),
  heroDetail: {
    hero: <ICharacter>{},
    comics: <IComic[]>[],
    series: <ISerie[]>[],
    loading: false,
    error: '',
  }
};


const reducer = createReducer(
  initialState,
  // LIST
  on(heroesActions.heroesLoad, (state) => {
    return {
      ...state,
      heroes: {
        ...state.heroes,
        loading: true,
        error: ''
      },
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
  on(heroesActions.heroSetTeam, (state, { id, changes }) => {
    return {
      ...state,
      heroes: heroesAdapter.updateOne({id, changes}, { ...state.heroes }),
      search: searchAdapter.updateOne({id, changes}, { ...state.search }),
      heroDetail: {
        ...state.heroDetail,
        hero: {
          ...state.heroDetail.hero,
          inTeam: changes.inTeam!
        }
      }
    }
  }),
  // SEARCH
  on(heroesActions.heroesSearch, (state, { term }) => {
    return {
      ...state,
      search: searchAdapter.removeAll({
        ...state.search,
        term: term,
        loading: true,
        searching: true,
      }),
    }
  }),
  on(heroesActions.heroesSearchSuccess, (state, { heroes }) => {
    return {
      ...state,
      search: searchAdapter.addMany(heroes, {
        ...state.search,
        loading: false,
      })
    }
  }),
  on(heroesActions.heroesSearchFail, (state, { error }) => {
    return {
      ...state,
      search: searchAdapter.removeAll({
        ...state.search,
        loading: false,
      }),
      error: error.message,
    }
  }),
  on(heroesActions.heroesSearchClean, (state) => {
    return {
      ...state,
      search: searchAdapter.removeAll({
        ...state.search,
        term: '',
        searching: false,
      }),
    }
  }),
  // DETAIL
  on(heroesActions.heroesDetail, (state) => {
    return {
      ...state,
      heroDetail: {
        ...state.heroDetail,
        hero: <ICharacter>{},
        comics: <IComic[]>[],
        serie: <ISerie[]>[],
        loading: true,
      }
    }
  }),
  on(heroesActions.heroesDetailSuccess, (state, { hero, comics, series }) => {
    return {
      ...state,
      heroDetail: {
        ...state.heroDetail,
        hero,
        comics,
        series,
        loading: false,
        error: '',
      }
    }
  }),
  on(heroesActions.heroesDetailFail, (state, { error }) => {
    return {
      ...state,
      heroDetail: {
        ...state.heroDetail,
        hero: <ICharacter>{},
        comics: <IComic[]>[],
        serie: <ISerie[]>[],
        loading: false,
        error: error.message,
      }
    }
  })
)

const {
  selectAll: selectHeroesAll,
  selectTotal: selectHeroesTotal,
  selectEntities: selectHeroesEntities,
} = heroesAdapter.getSelectors();

const {
  selectAll: selectSearchAll,
  selectTotal: selectSearchTotal,
} = searchAdapter.getSelectors();

const selectHeroesState = (state: State) => state.heroes;
const selectSearchState = (state: State) => state.search;

export {
  featureName,
  State,
  initialState,
  reducer,
  selectHeroesAll,
  selectHeroesTotal,
  selectHeroesState,
  selectHeroesEntities,
  selectSearchAll,
  selectSearchTotal,
  selectSearchState,
}