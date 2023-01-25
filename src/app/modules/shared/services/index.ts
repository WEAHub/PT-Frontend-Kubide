
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { ConfigService } from "./config/config.service";
import { RequestService } from "./http/http-request.service";

@NgModule({
  providers: [
    RequestService,
    { 
      provide : APP_INITIALIZER, 
      multi : true, 
       deps : [ConfigService], 
       useFactory : (appConfigService : ConfigService) =>  () => appConfigService.loadAppConfig()
    }
  ]
})

export class SharedServicesModule { }