import { NgModule } from "@angular/core";

import { SkeletonModule } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  exports: [
    InputTextModule,
    SkeletonModule,
    CardModule,
    ImageModule,
    BadgeModule,
    ButtonModule,
    MenubarModule,
  ]
})

export class PrimeNGModule { }