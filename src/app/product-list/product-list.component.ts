import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  selectedProduct: any;
  cartProducts: any[] = [];
  cardQuantity: number = 0;
  products: any[] = [ ];


  constructor(private apiService: ApiService) {}

   ngOnInit() {
    this.apiService.getProducts().subscribe((data) => {
      data.forEach((item: any) => {
        this.products.push({
          id: item.id,
          name: item.title,
          description: item.description,
          price: item.price,
          stock: 100,
          image: item.images[0],
          color: 'blue',
          spects:item.category.name
        }); //Agrega un nuevo elemento al array


      })
    })
  }

  handleProductSelected(product: any) {
    const existingProduct = this.cartProducts.findIndex((item) => item.id === product.id); // -1
    if (existingProduct !== -1) {
      this.cartProducts[existingProduct].quantity++;
    }
    else {
      product.quantity = 1;
      this.cartProducts.push(product);
    }
    this.cardQuantity = 0;

    this.cartProducts.forEach((item) => {
      this.cardQuantity += item.quantity;
    });
    console.log(this.cartProducts);
    product.stock--;
    //alert('Producto seleccionado: ' + product.name);
  }
}
