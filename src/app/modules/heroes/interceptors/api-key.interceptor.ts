import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "../../shared/services/config/config.service";

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
 
	constructor(
    private readonly configService: ConfigService
  ) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(!this.configService.loaded 
      || !req.url.includes(this.configService.apiBaseUrl)) {
      return next.handle(req);
    }

    const authReq = req.clone({ 
      params: req.params.set('apikey', this.configService.apiKey) 
    });

    return next.handle(authReq);
  }

}