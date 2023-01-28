import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { ITeamCharacter } from "../../models/team.model";

const teamAdapter: EntityAdapter<ITeamCharacter> = createEntityAdapter<ITeamCharacter>({});

interface TeamState extends EntityState<ITeamCharacter> {
  loading: boolean,
  error: string,
  name: string,
  description: string,
}

export {
  TeamState,
  teamAdapter
}