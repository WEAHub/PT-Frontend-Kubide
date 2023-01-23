import { NgModule } from "@angular/core";
import { SkeletonModule } from 'primeng/skeleton';
import { ScrollerModule } from 'primeng/scroller';
import { CardModule } from 'primeng/card';

@NgModule({
  exports: [
    SkeletonModule,
    ScrollerModule,
    CardModule
  ]
})

export class PrimeNGModule { }