import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit {
  product: any = {
    id: 1,
    name: 'Ejemplo',
    description: 'El mejor celular del mundo',
    price: 1500,
    stock: 15,
    image: 'https://www.citypng.com/public/uploads/preview/iphone-14-pro-and-max-deep-purple-png-11662587434zacaxkb4sd.png',
    color: 'grey'
  }
  routeObj: any={};
  constructor( private route: ActivatedRoute) { }

 async ngOnInit(){
    // this.route.params.subscribe(params => {
    //   console.log(params);
    // });
   await this.route.queryParams.subscribe(params => {
    console.log(params);

     this.product = JSON.parse(params['data']);
    });
  }
  selectProduct() {
   // this.productSelected.emit(this.product);
  }
}
