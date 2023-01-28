import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ITeamCharacter } from '../../models/team.model';
import { teamModifyHero } from '../../store/team.actions';
import { TeamState } from '../../store/team.reducer';

@Component({
  selector: 'app-modify-hero',
  templateUrl: './modify-hero.component.html',
  styleUrls: ['./modify-hero.component.scss']
})

export class ModifyHeroComponent {

  @Input() display!: boolean
  @Input() hero!: ITeamCharacter

  @Output() displayChange = new EventEmitter();

  heroForm: FormGroup = this.fb.group({
    name: [this.hero?.name, [Validators.required]],
    description: [this.hero?.description, [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private store: Store<{team: TeamState}>
  ) { }
  

  onHide() {
    this.displayChange.emit(false);
  }

  onShow() {
    this.heroForm.patchValue(this.hero)
  }

  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }

  modifyHero() {
    if(this.heroForm.valid) {

      const update = {
        id: this.hero.id,
        changes: {
          name: this.heroForm.get('name')?.value,
          description: this.heroForm.get('description')?.value,
          modifiedDt: new Date()
        }
      }

      this.store.dispatch(teamModifyHero(update))
      this.display = false
    }
  }

}
