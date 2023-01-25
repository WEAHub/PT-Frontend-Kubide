import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ConfigService } from '../../shared/services/config/config.service';
import { RequestService } from '../../shared/services/http/http-request.service';
import { ICharacter, IMarvelResponse } from '../models/heroes-api.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

 //e7703a34d193edcb92913383165f6093

  constructor(
    private readonly configService: ConfigService,
    private readonly requestService: RequestService
  ) { }

  loadHeroes(offset: number): Observable<IMarvelResponse<ICharacter>> {
    return this.requestService.httpGet(this.configService.apiGetCharacters + '?offset=' + offset);
  }

  searchHero(term: string): Observable<IMarvelResponse<ICharacter>> {
    return this.requestService.httpGet(this.configService.apiGetCharacters + '?nameStartsWith=' + term)
  }

  loadHeroByID(id: string): Observable<IMarvelResponse<ICharacter>> {
    return this.requestService.httpGet(this.configService.apiGetCharacters + '/' + id);
  }
}
