import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Product } from './product'; 
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  
  constructor(private http: Http) { }

  //retrieving Product Service
  getProducts()
  {
  	return this.http.get('http://localhost:3000/api/product').map(res=> res.json());
  }
  // add product
   addProduct(newProduct)
  {
  	 var headers =  new Headers();
  	 headers.append('Content-Type', 'application/json');
  	 return this.http.post('http://localhost:3000/api/product',newProduct,{headers:headers}).map(res=>res.json());
  }

  //delete method
  deleteProduct(id){
  	return this.http.delete('http://localhost:3000/api/product/' +id).map(res => res.json());
  }
}
