import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { teamModifyTeam } from '../../store/team.actions';
import { TeamState } from '../../store/team.reducer';

interface ITeam {
  name: string;
  description: string;
}

@Component({
  selector: 'app-modify-team',
  templateUrl: './modify-team.component.html',
  styleUrls: ['./modify-team.component.scss']
})

export class ModifyTeamComponent {

  @Input() display!: boolean
  @Input() team: ITeam = {
    name: '',
    description: '',
  }

  @Output() displayChange = new EventEmitter();

  teamForm: FormGroup = this.fb.group({
    name: [this.team.name, [Validators.required]],
    description: [this.team.description, [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private store: Store<{team: TeamState}>
  ) { }
  

  onHide() {
    this.displayChange.emit(false);
  }

  onShow() {
    this.teamForm.patchValue(this.team)
  }

  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }

  modifyTeam() {
    if(this.teamForm.valid) {

      const update = {
        name: this.teamForm.get('name')?.value,
        description: this.teamForm.get('description')?.value
      }

      this.store.dispatch(teamModifyTeam(update))
      this.display = false
    }
  }

}
