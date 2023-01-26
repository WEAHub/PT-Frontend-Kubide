import { Action, createAction, props } from '@ngrx/store';
import { IHTTPErrorResponse } from '../../shared/services/models/http-responses.model';
import { ICharacter, IComic, IMarvelResponseData, ISerie, IStory } from '../models/heroes-api.model';

enum heroesActions {
  LOAD_HEROES = '[LOAD] Load heroes',
  LOAD_HEROES_SUCCESS = '[LOAD] Load heroes success',
  LOAD_HEROES_FAIL = '[LOAD] Load heroes fail',

  SEARCH_HEROES = '[SEARCH] Searching hero',
  SEARCH_HEROES_SUCCESS = '[SEARCH] Searching hero success',
  SEARCH_HEROES_FAIL = '[SEARCH] Searching hero fail',
  SEARCH_HEROES_CLEAN = '[SEARCH] Searching hero clean',

  DETAIL_HEROES = '[DETAIL] Load hero',
  DETAIL_HEROES_SUCCESS = '[DETAIL] Load hero success',
  DETAIL_HEROES_FAIL = '[DETAIL] Load hero fail',
}

const heroesLoad = createAction(
  heroesActions.LOAD_HEROES,
  props<{
    offset: number
  }>()
);

const heroesLoadSuccess = createAction(
  heroesActions.LOAD_HEROES_SUCCESS,
  props<{heroes: ICharacter[], total: number}>()
);

const heroesLoadFail = createAction(
  heroesActions.LOAD_HEROES_FAIL,
  props<{error: IHTTPErrorResponse}>()
);

const heroesSearch = createAction(
  heroesActions.SEARCH_HEROES,
  props<{term: string}>()
)

const heroesSearchSuccess = createAction(
  heroesActions.SEARCH_HEROES_SUCCESS,
  props<{heroes: ICharacter[]}>()
)

const heroesSearchFail = createAction(
  heroesActions.SEARCH_HEROES_FAIL,
  props<{error: IHTTPErrorResponse}>()
);

const heroesSearchClean = createAction(
  heroesActions.SEARCH_HEROES_CLEAN,
);

const heroesDetail = createAction(
  heroesActions.DETAIL_HEROES,
  props<{ heroId: string }>()
)

const heroesDetailSuccess = createAction(
  heroesActions.DETAIL_HEROES_SUCCESS,
  props<{ 
    hero: ICharacter, 
    comics: IComic[],
    series: ISerie[]
  }>()
)

const heroesDetailFail = createAction(
  heroesActions.DETAIL_HEROES_FAIL,
  props<{error: IHTTPErrorResponse}>()
)

export {
  heroesActions,
  heroesLoad,
  heroesLoadSuccess,
  heroesLoadFail,

  heroesSearch,
  heroesSearchSuccess,
  heroesSearchFail,
  heroesSearchClean,

  heroesDetail,
  heroesDetailSuccess,
  heroesDetailFail
}