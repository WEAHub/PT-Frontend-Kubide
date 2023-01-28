
import { createReducer, on  } from "@ngrx/store";
import * as teamActions from "./team.actions";
import { teamAdapter, TeamState } from "./entities/team.entity";

const featureName = "teamStore";

const initialState: TeamState = teamAdapter.getInitialState({
  loading: false,
  error: '',
  name: 'Kubide Team',
  description: 'The Avengers are a team of Marvel superheroes fighting against crime and injustice using their unique abilities and advanced technology to protect Earth from extraterrestrial and national threats.',
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
  on(teamActions.teamLocalLoadSuccess, (state, { name, description, heroes }) => {
    return teamAdapter.addMany(heroes, { 
      ...state,
      name,
      description
    })
  }),
  on(teamActions.teamModifyHero, (state, { id, changes }) => {
    return teamAdapter.updateOne({id, changes}, { ...state })
  }),
  on(teamActions.teamModifyTeam, (state, {name, description}) => {
    return {
      ...state,
      name,
      description,
    }
  })
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