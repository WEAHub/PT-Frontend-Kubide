import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ConfigService } from '../../shared/services/config/config.service';
import { RequestService } from '../../shared/services/http/http-request.service';
import { ICharacter, IComic, IMarvelResponse, ISerie, IStory } from '../models/heroes-api.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  constructor(
    private readonly configService: ConfigService,
    private readonly requestService: RequestService
  ) { 


  }

  getHeroes(offset: number): Observable<IMarvelResponse<ICharacter>> {
    return this.requestService.httpGet(this.configService.apiGetCharacters 
      + '?offset=' + offset
      + '&limit=' + this.configService.apiLimit);
  }

  searchHero(term: string): Observable<IMarvelResponse<ICharacter>> {
    return this.requestService.httpGet(this.configService.apiGetCharacters + '?nameStartsWith=' + term);
  }

  getHeroById(id: string): Observable<IMarvelResponse<ICharacter>> {
    return this.requestService.httpGet([
      this.configService.apiGetCharacters,
      id,
    ].join('/'))
  }

  getComicsByHeroId(id: string): Observable<IMarvelResponse<IComic>> {
    return this.requestService.httpGet([
      this.configService.apiGetCharacters,
      id,
      this.configService.apiGetComics,
    ].join('/') + '?limit=' + this.configService.apiLimit);
  }

  getSeriesByHeroId(id: string): Observable<IMarvelResponse<ISerie>> {
    return this.requestService.httpGet([
      this.configService.apiGetCharacters,
      id,
      this.configService.apiGetSeries,
    ].join('/') + '?limit=' + this.configService.apiLimit);
  } 

/*   
  getStoriesByHeroId(id: string): Observable<IMarvelResponse<IStory>> {
    return this.requestService.httpGet([
      this.configService.apiGetCharacters,
      id,
      this.configService.apiGetStories,
    ].join('/'));
  }
  
  getEventsByHeroId(id: string): Observable<IMarvelResponse<IComic>> {
    return this.requestService.httpGet([
      this.configService.apiGetCharacters,
      id,
      this.configService.apiGetEvents,
    ].join('/'));
  }
  
  */

}
