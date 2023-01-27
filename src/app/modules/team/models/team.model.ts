import { ICharacter } from "../../heroes/models/heroes-api.model";

interface ITeamCharacter extends ICharacter {
  modifiedDt: Date;
  addedDt: Date;
}

export {
  ITeamCharacter,
}