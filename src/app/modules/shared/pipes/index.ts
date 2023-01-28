import { NgModule } from "@angular/core";
import { DateAgoPipe } from "./date-ago/dateAgo.pipe";

@NgModule({
  declarations: [
    DateAgoPipe
  ],
  exports: [
    DateAgoPipe
  ]
})

export class SharedPipesModule { }