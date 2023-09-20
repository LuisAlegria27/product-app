import { Component, OnInit, ViewChild } from '@angular/core';

import { ApiService } from '../api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-table',

  templateUrl: './product-table.component.html',

  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnInit {
  displayedColumns = ['id', 'name', 'price', 'stock', 'actions'];
  products = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit() {
    this.products.paginator = this.paginator;
  }

  loadProducts() {
    this.apiService.getProducts().subscribe((data) => {
      this.products.data = data.map((item: any) => {
        return {
          id: item.id,
          name: item.title,
          description: item.description,
          price: item.price,
          stock: item.rating.count,
          image: item.image,
          color: 'blue',
          spects: item.category,
        };
      });

      // data.forEach((item: any) => {

      //   this.products.push({

      //     id: item.id,

      //     name: item.title,

      //     description: item.description,

      //     price: item.price,

      //     stock: item.rating.count,

      //     image: item.image,

      //     color: 'blue',

      //     spects:item.category

      //   }); // agrega un nuevo elemento al array

      // });

      console.log(this.products);
    });
  }



  handleProductDelete(product: any) {
    //console.log();

  }

  handleProductEdit(product: any) {
    //console.log()
    this.router.navigate(['/products/form'], { queryParams: { data: JSON.stringify(product), action:'edit'} });
  }

  handleProductSelected(product: any) {
    this.router.navigate(['/products/form'], { queryParams: { data: JSON.stringify(product), action:'show'} });
  }

  handleProductCreate() {
    this.router.navigate(['/products/form'], { queryParams: {action: 'create'} });

  }
}
