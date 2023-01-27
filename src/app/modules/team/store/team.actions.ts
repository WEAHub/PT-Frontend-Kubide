import { Action, createAction, props } from '@ngrx/store';
import { ICharacter } from '../../heroes/models/heroes-api.model';
import { IHTTPErrorResponse } from '../../shared/services/models/http-responses.model';
import { ITeamCharacter } from '../models/team.model';

enum teamActions {
  ADD_TEAM_HERO = '[TEAM] Add hero',
  REMOVE_TEAM_HERO = '[TEAM] Remove hero',
  MODIFY_TEAM_HERO = '[TEAM] Modify hero',

  SAVE_TEAM = '[TEAM] Team save in local storage',
  LOAD_TEAM = '[TEAM] Team loaded from local storage',
  LOAD_TEAM_SUCCESS = '[TEAM] Team loaded from local storage success',
  LOAD_TEAM_SUCCESS_NO_HEROES = '[TEAM] No heroes in local storage'
}


const teamAddHero = createAction(
  teamActions.ADD_TEAM_HERO,
  props<{ hero: ICharacter }>()
);

const teamRemoveHero = createAction(
  teamActions.REMOVE_TEAM_HERO,
  props<{ heroId: number }>()
);

const teamModifyHero = createAction(
  teamActions.MODIFY_TEAM_HERO,
  props<{ heroId: number, update: ITeamCharacter }>()
);


const teamLocalSave = createAction(
  teamActions.SAVE_TEAM,
  props<{ heroes: ITeamCharacter[] }>()
)

const teamLocalLoad = createAction(
  teamActions.LOAD_TEAM,
)

const teamLocalLoadSuccess = createAction(
  teamActions.LOAD_TEAM_SUCCESS,
  props<{heroes: ITeamCharacter[] }>()
)

const teamLocalLoadNoHeroes = createAction(
  teamActions.LOAD_TEAM_SUCCESS_NO_HEROES,
)

export {
  teamAddHero,
  teamRemoveHero,
  teamModifyHero,
  teamLocalSave,
  teamLocalLoad,
  teamLocalLoadSuccess,
  teamLocalLoadNoHeroes
}