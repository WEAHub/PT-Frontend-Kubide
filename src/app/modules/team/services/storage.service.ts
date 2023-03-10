import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ITeamCharacter } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  teamKey = 'team'

  constructor() { }

  saveTeam(heroes: ITeamCharacter[], name:  string, description: string): Observable<any> {
    const teamJson = JSON.stringify({
      heroes, 
      name, 
      description
    })
    localStorage.setItem(this.teamKey, teamJson)
    return of()
  }

  loadTeam(): Observable<any> {
    const localTeam = localStorage.getItem(this.teamKey)!

    if(localTeam === null) {
      return throwError(() => new Error())
    }

    const serializedTeam = JSON.parse(localTeam)

    return of(serializedTeam)
  }
  
}
