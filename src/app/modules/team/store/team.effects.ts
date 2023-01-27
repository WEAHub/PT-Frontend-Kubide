import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaust, exhaustMap, forkJoin, map, of, switchMap, tap } from "rxjs";

import { IHTTPErrorResponse } from "../../shared/services/models/http-responses.model";
import { ITeamCharacter } from "../models/team.model";
import { StorageService } from "../services/storage.service";
import { TeamService } from "../services/team.service";
import * as teamActions from './team.actions';

@Injectable()

export class TeamEffects {

  constructor(
		private actions$: Actions,
    private storageService: StorageService
  ) { }

  saveTeam$ = createEffect(() => this.actions$.pipe(
		ofType(teamActions.teamLocalSave),
		tap(payload => {
      this.storageService.saveTeam(payload.heroes)
		})
	), { dispatch: false });

  loadTeam$ = createEffect(() => this.actions$.pipe(
		ofType(teamActions.teamLocalLoad),
    exhaustMap(() => this.storageService.loadTeam().pipe(
      map(heroes => teamActions.teamLocalLoadSuccess({heroes}))
    ))
  ))

}