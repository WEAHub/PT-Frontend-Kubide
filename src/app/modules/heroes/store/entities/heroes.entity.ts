import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { ICharacter } from "../../models/heroes-api.model";

export const heroesAdapter: EntityAdapter<ICharacter> = createEntityAdapter<ICharacter>();
export interface HeroesState extends EntityState<ICharacter> {
  loading: boolean,
  maxHeroesToLoad: number,
  error: string,
}