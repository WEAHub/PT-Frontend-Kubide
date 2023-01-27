import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaust, exhaustMap, forkJoin, map, of, switchMap, take, tap, withLatestFrom } from "rxjs";

import * as heroesActions from "./heroes.actions";
import { HeroesService } from "../services/heroes.service";
import { ICharacter, IMarvelResponse, IMarvelResponseData } from "../models/heroes-api.model";
import { IHTTPErrorResponse } from "../../shared/services/models/http-responses.model";
import {  Action, Store } from "@ngrx/store";
import { getTeam } from "../../team/store/team.selectors";
import { ITeamCharacter } from "../../team/models/team.model";

@Injectable()

export class HeroesEffects {
	
	heroesLoad$ = createEffect(() => this.actions$.pipe(
		ofType(heroesActions.heroesLoad),
		withLatestFrom(
			this.store.select(getTeam)
		),
		exhaustMap(([params, team]: [any, any[]]) => this.heroesService.getHeroes(params.offset).pipe(
			map((heroes: IMarvelResponse<ICharacter>) => heroesActions.heroesLoadSuccess({
        heroes: heroes.data.results.map(hero => {
					return {
						...hero,
						inTeam: team.find(teamHero => teamHero.id === hero.id)
					}
				}),
        total: heroes.data.total
      })),
			catchError((error: IHTTPErrorResponse) => of(heroesActions.heroesLoadFail({ error })))
		))
	))

	heroesSearch$ = createEffect(() => this.actions$.pipe(
		ofType(heroesActions.heroesSearch),
		switchMap((params) => this.heroesService.searchHero(params.term).pipe(
			map((heroes: IMarvelResponse<ICharacter>) => heroesActions.heroesSearchSuccess({
         heroes: heroes.data.results
      })),
			catchError((error: IHTTPErrorResponse) => of(heroesActions.heroesSearchFail({ error })))
		))
	))

	heroesDetail$ = createEffect(() => this.actions$.pipe(
		ofType(heroesActions.heroesDetail),
		exhaustMap((params) => forkJoin([
			this.heroesService.getHeroById(params.heroId).pipe(hero => hero),
			this.heroesService.getComicsByHeroId(params.heroId).pipe(comics => comics),
			this.heroesService.getSeriesByHeroId(params.heroId).pipe(series => series),
		])),
		map(data => heroesActions.heroesDetailSuccess({
			hero: data[0].data.results[0],
			comics: data[1].data.results,
			series: data[2].data.results
		})),
		catchError((error: IHTTPErrorResponse) => of(heroesActions.heroesSearchFail({ error })))
	))

  constructor(
    private readonly heroesService: HeroesService,
		private store: Store,
		private actions$: Actions,
  ) {}
}