import { Action, createAction, props } from '@ngrx/store';
import { IHTTPErrorResponse } from '../../shared/services/interfaces/http-responses.model';
import { ICharacter, IMarvelResponseData } from '../interfaces/heroes-api.model';

enum heroesActions {
  LOAD_HEROES = '[LOAD] Load heroes',
  LOAD_HEROES_SUCCESS = '[LOAD] Load heroes success',
  LOAD_HEROES_FAIL = '[LOAD] Load heroes fail'
}

const heroesLoad = createAction(
  heroesActions.LOAD_HEROES
);

const heroesLoadSuccess = createAction(
  heroesActions.LOAD_HEROES_SUCCESS,
  props<{heroes: ICharacter[]}>()
);

const heroesLoadFail = createAction(
  heroesActions.LOAD_HEROES_FAIL,
  props<{error: IHTTPErrorResponse}>()
);

export {
  heroesActions,
  heroesLoad,
  heroesLoadSuccess,
  heroesLoadFail
}