import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingServiceProvider
{

  ShoppingCart : Array<any> = [];
  quantity = 0;
  form = {};

  constructor(public http: Http)
  {
  
  }

  addtoCart(id, name, quantity, price, dish_type, SpecialRequest)
  {
     if(this.ShoppingCart[0] == null || this.ShoppingCart[0] == undefined || this.ShoppingCart[0]== [])
     {
          if(SpecialRequest == null || SpecialRequest == undefined)
          {
             SpecialRequest = "";
          }
          let newItem = {dish_id: id, dish_name: name, dish_qty: quantity, type: dish_type, dish_price:price , total: Math.round((Number(quantity)*Number(price))*100)/100, request: SpecialRequest};
          console.log(newItem);
          this.ShoppingCart.push(newItem);
     }
     else
     {
         for(let i=0; i<this.ShoppingCart.length; i++)
         {
                  if(this.ShoppingCart[i]['dish_id'] == id)
                  {
                      this.ShoppingCart[i]['dish_qty'] = this.ShoppingCart[i]['dish_qty'] + quantity;
                      this.ShoppingCart[i]['total'] = Math.round((Number(this.ShoppingCart[i]['dish_qty'])*Number(this.ShoppingCart[i]['dish_price']))*100)/100;
                      if(SpecialRequest==null || SpecialRequest==undefined)
                      {

                      }
                      else
                      {
                          this.ShoppingCart[i]['request'] = SpecialRequest;
                      }
                      console.log(this.ShoppingCart[i]);
                      break;
                  }
                  else
                  {
                      if(i == this.ShoppingCart.length-1)
                      {
                              if(SpecialRequest == null || SpecialRequest == undefined)
                              {
                                 SpecialRequest = "";
                              }
                              let newItem = {dish_id: id, dish_name: name, dish_qty: quantity, type: dish_type, dish_price:price , total: Math.round((Number(quantity)*Number(price))*100)/100, request: SpecialRequest};
                              console.log(newItem);
                              this.ShoppingCart.push(newItem);
                              break;
                      }
                  }
         }
     }
  }

  RemoveFromCart(dish_id)
  {
        let Copy_ShoppingCart = this.ShoppingCart;
        this.ShoppingCart = []
        for(let i=0; i<Copy_ShoppingCart.length; i++)
        {
            if(Copy_ShoppingCart[i]['dish_id'] == dish_id)
            {
                console.log('ItemRemove');
            }
            else
            {
                this.ShoppingCart.push(Copy_ShoppingCart[i]);
            }
        }
        return this.ShoppingCart;
  }

  PlusQuantity(dish_id)
  {
        for(let i=0; i<this.ShoppingCart.length; i++)
        {
            if(this.ShoppingCart[i]['dish_id'] == dish_id)
            {
                this.ShoppingCart[i]['dish_qty'] = this.ShoppingCart[i]['dish_qty'] + 1;
                this.ShoppingCart[i]['total'] = Math.round((Number(this.ShoppingCart[i]['dish_qty'])*Number(this.ShoppingCart[i]['dish_price']))*100)/100;
                break;
            }
        }
        return this.ShoppingCart;
  }

  MinusQuantity(dish_id)
  {
          for(let i=0; i<this.ShoppingCart.length; i++)
          {
              if(this.ShoppingCart[i]['dish_id'] == dish_id)
              {
                  if(this.ShoppingCart[i]['dish_qty']>1)
                  {
                      this.ShoppingCart[i]['dish_qty'] = this.ShoppingCart[i]['dish_qty'] - 1;
                      this.ShoppingCart[i]['total'] = Math.round((Number(this.ShoppingCart[i]['dish_qty'])*Number(this.ShoppingCart[i]['dish_price']))*100)/100;
                      break;
                  }
                  else
                  {
                      break;
                  }
              }
          }
          return this.ShoppingCart;
  }

  getShoppingCart()
  {
      return this.ShoppingCart;
  }

  clearCart()
  {
    this.ShoppingCart = [];
    this.quantity = 0;
  }

  getQuantity()
  {
      this.quantity = 0;
      for(let i=0; i<this.ShoppingCart.length; i++)
      {
          this.quantity = this.quantity + this.ShoppingCart[i]['dish_qty'];
      }
      return this.quantity;
  }

}
