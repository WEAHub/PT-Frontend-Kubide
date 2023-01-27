
import { createReducer, on  } from "@ngrx/store";
import * as teamActions from "./team.actions";
import { teamAdapter, TeamState } from "./entities/team.entity";

const featureName = "teamStore";

const initialState: TeamState = teamAdapter.getInitialState({
  loading: false,
  error: '',
});

const reducer = createReducer(
  initialState,
  on(teamActions.teamAddHero, (state, { hero }) => {
    const addedDt = new Date();
    const modifiedDt = addedDt;
    const newTeamHero = {
      ...hero,
      addedDt,
      modifiedDt
    }
    return teamAdapter.addOne(newTeamHero, { ...state })
  }),
  on(teamActions.teamRemoveHero, (state, { heroId } ) => {
    return teamAdapter.removeOne(heroId, { ...state })
  })
  ,
  on(teamActions.teamLocalLoadSuccess, (state, { heroes }) => {
    return teamAdapter.addMany(heroes, { ...state })
  }),
)

const {
  selectAll: selectTeamAll,
  selectTotal: selectTeamTotal,
} = teamAdapter.getSelectors();


export {
  featureName,
  reducer,
  TeamState,
  selectTeamAll,
  selectTeamTotal,
}