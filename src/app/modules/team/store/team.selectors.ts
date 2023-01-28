import { Statement } from "@angular/compiler";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TeamState } from "./entities/team.entity";

import * as fromTeam from "./team.reducer";

const teamState = createFeatureSelector<fromTeam.TeamState>(fromTeam.featureName);
const teamHeroesState = createSelector(teamState, state => state);


/**
 *  Team List
 *  Path: /team
 */

const getTeam = createSelector(
  teamHeroesState,
  fromTeam.selectTeamAll
) 

const getTeamCount = createSelector(
  teamHeroesState,
  fromTeam.selectTeamTotal
)

const getTeamName = createSelector(
  teamState,
  (state: TeamState) => state.name
)

const getTeamDescription = createSelector(
  teamState,
  (state: TeamState) => state.description
)

export {
  getTeam,
  getTeamCount,
  getTeamName,
  getTeamDescription
}