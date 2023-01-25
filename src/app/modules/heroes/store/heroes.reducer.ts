
import { createReducer, on  } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ICharacter, IMarvelResponseData } from "../models/heroes-api.model";
import * as heroesActions from "./heroes.actions";

const featureName = "heroes";

interface State extends EntityState<ICharacter>{
  loading: boolean;
  error: string;
  maxHeroesToLoad: number;
  searchTerm: string;
  searchResults: ICharacter[];
  searchLoading: boolean;
  searching: boolean;
  team: [];
  heroDetail: ICharacter;
  heroDetailLoading: boolean;
  heroDetailError: string;
}

const heroesAdapter: EntityAdapter<ICharacter> = createEntityAdapter<ICharacter>();

const initialState: State = heroesAdapter.getInitialState({
  loading: false,
  maxHeroesToLoad: 0,
  error: '',
  searching: false,
  searchTerm: '',
  searchResults: [],
  searchLoading: false,
  team: [],
  heroDetail: <ICharacter>{},
  heroDetailLoading: false,
  heroDetailError: '',
});


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
    return heroesAdapter.addMany(heroes, {
      ...state,
      loading: false,
      maxHeroesToLoad: total,
      error: '',
    })
  }),
  on(heroesActions.heroesLoadFail, (state, { error }) => {
    return heroesAdapter.removeAll({
      ...state,
      loading: false,
      error: error.message,
    })
  }),
  // SEARCH
  on(heroesActions.heroesSearch, (state, { term }) => {
    return {
      ...state,
      searchTerm: term,
      searchResults: [],
      searchLoading: true,
      searching: true,
    }
  }),
  on(heroesActions.heroesSearchSuccess, (state, { heroes }) => {
    return {
      ...state,
      searchResults: heroes,
      searchLoading: false,
    }
  }),
  on(heroesActions.heroesSearchFail, (state, { error }) => {
    return {
      ...state,
      error: error.message,
      searchLoading: false,
    }
  }),
  on(heroesActions.heroesSearchClean, (state) => {
    return {
      ...state,
      searchTerm: '',
      searching: false,
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
  selectAll,
  selectTotal,
} = heroesAdapter.getSelectors();

export {
  featureName,
  State,
  reducer,
  selectAll,
  selectTotal
}