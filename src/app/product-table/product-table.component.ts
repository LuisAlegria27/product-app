import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {
  displayedColumns = ['id', 'name', 'price', 'stock', 'actions'];
  products = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadProducts();
  }
  ngAfterViewInit() {
    this.products.paginator = this.paginator;
  }
  loadProducts() {
    this.apiService.getProducts().subscribe((data) => {
      this.products.data = data.map((item: any) => ({
        id: item.id,
        name: item.title,
        description: item.description,
        price: item.price,
        stock: 100,
        image: item.images[0],
        color: 'blue',
        spects:item.category.name
      }));
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
    const dialogRef = this.dialog.open(DeleteProductDialog, {
      width: '250px',
      data: { product }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.apiService.deleteProduct(product.id).subscribe((data) => {
          console.log(data);
          alert('Producto eliminado')
          this.loadProducts();
        });
      }
    });
    // }
  }
  handleProductEdit(product: any) {
    //console.log(product);
    this.router.navigate(['/products/form'], { queryParams: { data: JSON.stringify(product), action: 'edit' } });
  }
  handleProductSelected(product: any) {
    this.router.navigate(['/products/form'], { queryParams: { data: JSON.stringify(product), action: 'show' } });
  }
  handleProductCreate() {
    this.router.navigate(['/products/form'], { queryParams: { action: 'create' } });
  }



}
@Component({
  template: `
    <h1 mat-dialog-title>Eliminar Producto</h1>
    <div mat-dialog-content>
      ¿Desea eliminar este item?
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No</button>
      <button mat-button [mat-dialog-close]="true">Sí</button>
    </div>
  `
})
export class DeleteProductDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { product: any }
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
