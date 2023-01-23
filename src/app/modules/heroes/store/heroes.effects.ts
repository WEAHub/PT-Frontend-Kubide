import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";

import * as heroesActions from "./heroes.actions";
import { HeroesService } from "../services/heroes.service";
import { ICharacter, IMarvelResponse, IMarvelResponseData } from "../interfaces/heroes-api.model";
import { IHTTPErrorResponse } from "../../shared/services/interfaces/http-responses.model";

@Injectable()

export class HeroesEffects {
	
	heroesLoad$ = createEffect(() => this.actions$.pipe(
		ofType(heroesActions.heroesLoad),
		exhaustMap(() => this.heroesService.loadHeroes().pipe(
			map((heroes: IMarvelResponse<ICharacter>) => heroesActions.heroesLoadSuccess({ heroes: heroes.data.results })),
			catchError((error: IHTTPErrorResponse) => of(heroesActions.heroesLoadFail({ error })))
		))
	))

  constructor(
    private readonly heroesService: HeroesService,
		private actions$: Actions,
  ) {}
}