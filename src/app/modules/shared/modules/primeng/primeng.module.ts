import { NgModule } from "@angular/core";

import { SkeletonModule } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from "primeng/api";
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabViewModule } from 'primeng/tabview';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  exports: [
    InputTextModule,
    SkeletonModule,
    CardModule,
    ImageModule,
    BadgeModule,
    ButtonModule,
    MenubarModule,
    ToastModule,
    ScrollPanelModule,
    TabViewModule,
    CarouselModule
  ],
  providers: [
    MessageService
  ]
})

export class PrimeNGModule { }