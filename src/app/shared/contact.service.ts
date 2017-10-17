import { Injectable } from '@angular/core';
import {RestangularModule, Restangular} from 'ngx-restangular';
import {Feedback} from './feedback';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ContactService {

  constructor(private restangular: Restangular) { }

  submitContact(feedback: Feedback): Observable<JSON> {

        return this.restangular.all('submit').post(feedback);

  }

}
