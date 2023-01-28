import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, of, switchMap, tap, withLatestFrom } from "rxjs";

import { StorageService } from "../services/storage.service";
import * as teamActions from './team.actions';
import { TeamState } from "./team.reducer";
import * as teamSelectors from './team.selectors'

@Injectable()

export class TeamEffects {

  constructor(
		private actions$: Actions,
    private store: Store<{team: TeamState}>,
    private storageService: StorageService
  ) { }

  saveTeam$ = createEffect(() => this.actions$.pipe(
		ofType(teamActions.teamLocalSave),
		withLatestFrom(
			this.store.select(teamSelectors.getTeam),
			this.store.select(teamSelectors.getTeamName),
			this.store.select(teamSelectors.getTeamDescription),
		),
		switchMap(([action, heroes, name, description]) =>
      this.storageService.saveTeam(heroes, name, description).pipe(
        tap(() => of(teamActions.teamLocalLoadSuccess({ name, description, heroes })))
      )
    )
	), { dispatch: false });

  loadTeam$ = createEffect(() => this.actions$.pipe(
		ofType(teamActions.teamLocalLoad),
    exhaustMap(() => this.storageService.loadTeam().pipe(
      map(localTeam => teamActions.teamLocalLoadSuccess(localTeam)),
			catchError(() => of(teamActions.teamLocalLoadNoHeroes()))
    ))
  ))

}