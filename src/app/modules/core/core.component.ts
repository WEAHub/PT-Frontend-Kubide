import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { HeroesState } from '../heroes/store/entities/heroes.entity';
import * as teamActions from '../team/store/team.actions';

@Component({
  selector: 'app-root',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent {
  title = 'Avengers Kubide PT';

  constructor(
    private store: Store,
  ) {
    this.store.dispatch(teamActions.teamLocalLoad())
  }
}
