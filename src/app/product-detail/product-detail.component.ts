import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  @Input() product: any;
  @Output() productSelected: EventEmitter<any> = new EventEmitter();
  colorStock: string = 'blue';
  constructor(private router: Router) { }

  selectProduct() {
    this.productSelected.emit(this.product);
  }
  showDetail() {
   this.router.navigate(['products/detail'], { queryParams: { data: JSON.stringify(this.product)} });
  }
}

