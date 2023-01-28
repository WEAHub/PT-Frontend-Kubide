import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RequestService } from '../../shared/services/http/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  constructor(
    private readonly requestService: RequestService,
  ) { }
  
}
