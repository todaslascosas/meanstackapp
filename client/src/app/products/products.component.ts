import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})

export class ProductsComponent implements OnInit {
	products: Product[];
	product: Product;
	product_name: string;
	product_desc: string;
    price: string;
	

  constructor(private productService: ProductService) { }

  //add product
  addProduct()
  {
    const newProduct ={
      product_name: this.product_name,
      product_desc: this.product_desc,
      price:this.price,
    }
    this.productService.addProduct(newProduct)
        .subscribe(product =>
         {
          this.products.push(product);
          this.productService.getProducts().subscribe(products => this.products = products);
         });
  }

  deleteProduct(id:any)
  {
    var products = this.products;
    this.productService.deleteProduct(id)
        .subscribe(data =>{
        if(data.n==1)
        {
          for(var i = 0; i< products.length; i++)
          {
            if(products[i]._id == id)
            {
              products.splice(i,1);
            }
          }
        }
        })
  }


  ngOnInit() {
  	 this.productService.getProducts().subscribe(products => this.products = products);
  }

}
