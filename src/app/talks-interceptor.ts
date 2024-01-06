import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';
import { talks } from '@app/talks/talks.data';

const lastUpdated = new Date();
export const talksInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('/talks')) {
    return next(req);
  }

  const response = {
    talks,
    meta: {
      lastUpdated,
      lastRefreshed: new Date(),
      lastEditor: 'Rainer Hahnekamp',
    },
  };

  return of(new HttpResponse({ body: response })).pipe(delay(0));
};
