import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { MyErrorHandler } from '../providers/MyErrorHandler';
import { apiUrl, ChainID, RestaurantID, AuthHeader } from '../providers/GlobalConstants';

@Injectable()
export class ServiceProvider
{
  form = {};
  constructor(public handler: MyErrorHandler, public http: Http)
  {
      console.log(apiUrl);
      console.log(ChainID);
      console.log(RestaurantID);
      console.log(AuthHeader);
  }

  loadSetting()
  {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", apiUrl+'/chains/'+ChainID+'/settings' , false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.setRequestHeader('Authorization', AuthHeader);
        try
        {
            xhttp.send();
            if (xhttp.readyState===4 && xhttp.status===200 && xhttp.responseText != "")
            {
                    let res = JSON.parse(xhttp.response);
                    this.form['data'] = res['data'];
                    this.form['message'] = res['message'];
                    this.form['CustomError'] = null;

            }
            else
            {
                this.handler.handleError("API: "+ xhttp.responseURL +" , ResponseStatus: "+xhttp.status);
                this.form['CustomError'] = 'Sorry! Connection Failed.';
                this.form['message'] = {};
                this.form['data'] = {};
            }
        }
        catch(err)
        {
            this.handler.handleError(err);
            this.form['CustomError'] = 'Check Your Internet Connection And Try Again.';
            this.form['message'] = null;
            this.form['data'] = null;
        }
        return this.form;
  }

  loadMenu()
  {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", apiUrl+'chains/'+ChainID+'/restaurants/'+RestaurantID+'/menu' , false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.setRequestHeader('Authorization',AuthHeader);
        try
        {
              xhttp.send();
              if (xhttp.readyState===4 && xhttp.status===200 && xhttp.responseText != "")
              {
                      let res = JSON.parse(xhttp.response);
                      this.form['data'] = res['data'];
                      this.form['message'] = res['message'];
                      this.form['CustomError'] = null;

              }
              else
              {
                      this.handler.handleError("API: "+ xhttp.responseURL +" , ResponseStatus: "+xhttp.status);
                      this.form['CustomError'] = 'Sorry! Connection Failed.';
                      this.form['message'] = {};
                      this.form['data'] = {};
              }
        }
        catch(err)
        {
              this.handler.handleError(err);
              this.form['CustomError'] = 'Check Your Internet Connection And Try Again.';
              this.form['message'] = null;
              this.form['data'] = null;
        }
        return this.form;
  }

  OrderHistory(ID)
  {
          let data = new FormData();
          data.append('hardware_id', ID);
          var xhttp = new XMLHttpRequest();
          xhttp.open("POST", apiUrl+'order/user_orders', false);
          xhttp.setRequestHeader('Authorization',AuthHeader);

          try
          {
              xhttp.send(data);
              if (xhttp.readyState===4 && xhttp.status===200)
              {
                      let res = JSON.parse(xhttp.response);
                      this.form['data'] = res['data'];
                      this.form['message'] = res['message'];
                      this.form['CustomError'] = null;

              }
              else
              {
                      this.handler.handleError("API: "+ xhttp.responseURL +" , ResponseStatus: "+xhttp.status);
                      this.form['CustomError'] = 'Sorry! Connection Failed.';
                      this.form['message'] = {};
                      this.form['data'] = {};
              }
          }
          catch(err)
          {
                this.handler.handleError(err);
                this.form['CustomError'] = 'Check Your Internet Connection And Try Again.';
                this.form['message'] = null;
                this.form['data'] = null;
          }
          return this.form;
  }

  ItemDetails(Dish_ID)
  {
          var xhttp = new XMLHttpRequest();
          xhttp.open("GET", apiUrl+'chains/'+ChainID+'/restaurants/'+RestaurantID+'/dish/'+Dish_ID, false);
          xhttp.setRequestHeader("Content-type", "application/json");
          xhttp.setRequestHeader('Authorization', AuthHeader);
          try
          {
              xhttp.send();
              if (xhttp.readyState===4 && xhttp.status===200 && xhttp.responseText != "")
              {
                      let res = JSON.parse(xhttp.response);
                      this.form['data'] = res['data'];
                      this.form['message'] = res['message'][0];
                      this.form['CustomError'] = null;

              }
              else
              {
                  this.handler.handleError("API: "+ xhttp.responseURL +" , ResponseStatus: "+xhttp.status);
                  this.form['CustomError'] = 'Sorry! Connection Failed.';
                  this.form['message'] = {};
                  this.form['data'] = {};
              }
          }
          catch(err)
          {
              this.handler.handleError(err);
              this.form['CustomError'] = 'Check Your Internet Connection And Try Again.';
              this.form['message'] = null;
              this.form['data'] = null;
          }
          return this.form;
  }

  PlaceOrder(Order)
  {
        let data = new FormData();
        data.append('order', JSON.stringify(Order));
        console.log(data);

        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", apiUrl+'order/registration', false);
        xhttp.setRequestHeader('Authorization',AuthHeader);

        try
        {
            xhttp.send(data);
            if (xhttp.readyState===4 && xhttp.status===200)
            {
                    let res = JSON.parse(xhttp.response);
                    this.form['data'] = res['data'];
                    this.form['message'] = res['message'];
                    this.form['CustomError'] = null;
                    console.log(this.form);
            }
            else
            {
                    this.handler.handleError("API: "+ xhttp.responseURL +" , ResponseStatus: "+xhttp.status);
                    this.form['CustomError'] = 'Sorry! Connection Failed.';
                    this.form['message'] = {};
                    this.form['data'] = {};
                    console.log(this.form);
            }
        }
        catch(err)
        {
              this.handler.handleError(err);
              this.form['CustomError'] = 'Check Your Internet Connection And Try Again.';
              this.form['message'] = null;
              this.form['data'] = null;
              console.log(this.form);
        }
        return this.form;
  }

  PaymentDetails(data)
  {
      console.log(data);
      var xhttp = new XMLHttpRequest();
      xhttp.open("POST", apiUrl+'order/payment_info', false);
      xhttp.setRequestHeader('Authorization',AuthHeader);

      try
      {
          xhttp.send(data);
          if (xhttp.readyState===4 && xhttp.status===200)
          {
                  let res = JSON.parse(xhttp.response);
                  this.form['data'] = res['data'];
                  this.form['message'] = res['message'];
                  this.form['CustomError'] = null;
                  console.log(this.form);
          }
          else
          {
                  this.handler.handleError("API: "+ xhttp.responseURL +" , ResponseStatus: "+xhttp.status);
                  this.form['CustomError'] = 'Sorry! Connection Failed.';
                  this.form['message'] = {};
                  this.form['data'] = {};
                  console.log(this.form);
          }
      }
      catch(err)
      {
            this.handler.handleError(err);
            this.form['CustomError'] = 'Check Your Internet Connection And Try Again.';
            this.form['message'] = null;
            this.form['data'] = null;
            console.log(this.form);
      }
      return this.form;
  }

}
