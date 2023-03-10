import { NgModule } from "@angular/core";

import { SkeletonModule } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from "primeng/api";
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabViewModule } from 'primeng/tabview';
import { CarouselModule } from 'primeng/carousel';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { InplaceModule } from 'primeng/inplace';
import { DialogModule } from 'primeng/dialog';
import { ScrollTopModule } from 'primeng/scrolltop';
import { DividerModule } from 'primeng/divider';

@NgModule({
  exports: [
    SkeletonModule,
    CardModule,
    ImageModule,
    BadgeModule,
    ButtonModule,
    MenubarModule,
    ToastModule,
    ScrollPanelModule,
    TabViewModule,
    CarouselModule,
    AvatarModule,
    TooltipModule,
    TableModule,
    InplaceModule,
    DialogModule,
    InputTextareaModule,
    InputTextModule,
    ScrollTopModule,
    DividerModule
  ],
  providers: [
    MessageService
  ]
})

export class PrimeNGModule { }