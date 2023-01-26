import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { ICharacter } from "../../models/heroes-api.model";

export const searchAdapter: EntityAdapter<ICharacter> = createEntityAdapter<ICharacter>({});
export interface SearchState extends EntityState<ICharacter> {
  searching: boolean,
  term: string,
  loading: boolean,
}