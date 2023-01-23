import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ConfigService } from '../../shared/services/config/config.service';
import { RequestService } from '../../shared/services/http/http-request.service';
import { ICharacter, IMarvelResponse } from '../interfaces/heroes-api.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(
    private readonly configService: ConfigService,
    private readonly requestService: RequestService
  ) { }

  loadHeroes(): Observable<IMarvelResponse<ICharacter>> {
    return this.requestService.httpGet(this.configService.apiGetCharacters);
  }
}
