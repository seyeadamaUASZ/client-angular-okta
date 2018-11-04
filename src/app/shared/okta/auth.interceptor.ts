import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {OktaAuthService} from '@okta/okta-angular';
import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private oktaAuth: OktaAuthService){

  }
  intercept(request: HttpRequest<any>,next:HttpHandler): Observable<HttpEvent<any>>{
    return from(this.handleAccess(request,next))
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    if (request.urlWithParams.indexOf('localhost') > -1) {
      //create accesstoken for to log
      const accessToke = await this.oktaAuth.getAccessToken();
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToke
        }
      });
    }
    return next.handle(request).toPromise();
  }
}
