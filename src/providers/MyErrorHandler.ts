import { Injectable } from '@angular/core';
import { ErrorHandler } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Injectable()
export class MyErrorHandler extends IonicErrorHandler implements ErrorHandler  {

    constructor(private ga: GoogleAnalytics)
    {
        super();
        this.ga.enableUncaughtExceptionReporting(true).then((res)=> {console.log(res);});
    }

    handleError(err: any): void
    {
        try
        {
            this.ga.trackEvent('error handler', err);
            console.error(err);
        }
        catch (e)
        {
            this.ga.trackEvent('error handler', e);
            console.error(e);
        }
    }

    logError(error: any)
    {
      const date = new Date().toISOString();
      if (error instanceof TypeError)
      {
        this.ga.trackEvent('error handler', error.message);
        console.error("Error Here");
      }
      else if (error instanceof Error)
      {
        this.ga.trackEvent('error handler', error.message);
        console.error("Error Here");
      }
      else
      {
        this.ga.trackEvent('error handler', error);
        console.error("Error Here");
      }
    }
}
