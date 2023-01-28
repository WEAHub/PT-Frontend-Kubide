import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { RequestService } from '../../shared/services/http/http-request.service';
import { ITeamCharacter } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  teamKey = 'team'

  constructor() { }

  saveTeam(heroes: ITeamCharacter[], title:  string, description: string): Observable<any> {
    const teamJson = JSON.stringify({
      heroes, 
      title, 
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
