
import { createReducer, on  } from "@ngrx/store";
import { ICharacter, IMarvelResponseData } from "../interfaces/heroes-api.model";
import * as heroesActions from "./heroes.actions";

const featureName = "heroes";

interface State {
  heroes: ICharacter[]
  loading: boolean
  error: string
  team: []
}

const initialState: State = {
  heroes: [],
  loading: false,
  error: '',
  team: [],
};

const reducer = createReducer(
  initialState,
  on(heroesActions.heroesLoad, (state) => {
    return {
      ...state,
      heroes: [],
      loading: true,
      error: '',
    }
  }),
  on(heroesActions.heroesLoadSuccess, (state, payload) => {
    return {
      ...state,
      heroes: payload.heroes,
      loading: false,
      error: '',
    }
  }),
  on(heroesActions.heroesLoadFail, (state, payload) => {
    return {
      ...state,
      heroes: [],
      loading: false,
      error: payload.error.message,
    }
  })
)

export {
  featureName,
  State,
  reducer
}