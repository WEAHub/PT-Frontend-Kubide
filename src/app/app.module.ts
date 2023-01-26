import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreRoutingModule } from './modules/core/core-routing.module';
import { CoreComponent } from './modules/core/core.component';
import { CoreMenuComponent } from './modules/core/components/menubar/menu.component';
import { CoreHomeComponent } from './modules/core/components/home/home.component';
import { Modules } from './modules'
import { environment } from '../environments/environment';
import { ApiKeyInterceptor } from './modules/shared/services/http/interceptors/api-key.interceptor';
import { CoreMenuTeamComponent } from './modules/core/components/menu-team/menu-team.component';

@NgModule({
  declarations: [
    CoreComponent,
    CoreMenuComponent,
    CoreHomeComponent,
    CoreMenuTeamComponent
  ],
  imports: [
    Modules,
    CoreRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      logOnly: environment.production 
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true
    },
  ],
  bootstrap: [CoreComponent]
})
export class AppModule { }
