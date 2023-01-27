import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RequestService } from '../../shared/services/http/http-request.service';
import { ITeamCharacter } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  teamKey = 'team'

  constructor() { }

  saveTeam(heroes: ITeamCharacter[]): Observable<any> {
    const teamJson = JSON.stringify(heroes)
    localStorage.setItem(this.teamKey, teamJson)
    return of()
  }

  loadTeam(): Observable<ITeamCharacter[]> {
    const team = JSON.parse(localStorage.getItem(this.teamKey)!) as ITeamCharacter[];
    return of(team)
  }
  
}
