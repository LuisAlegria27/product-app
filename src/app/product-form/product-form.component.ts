import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  action: string = 'new';
  product: any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private apiService: ApiService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], //Las comillas vacias son para poner valores iniciales, en nuestro caso estan vacios
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      image: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      console.log(params);
      this.action = params.action;

      if (this.action !== 'create' && params.data) {
        this.product = JSON.parse(params.data);
        this.productForm.patchValue({
          name: this.product.name || '',
          price: this.product.price || '',
          stock: this.product.stock || '',
          Image: this.product.image || '',
          description: this.product.description || '',
        });
      }

      if (this.action == 'show') {
        this.productForm.disable();
      }

      //this.product = JSON.parse(params['data']);
    });
  }

  onCancel() {
    this.location.back();
  }

  getNameTitle() {
    if (this.action == 'create') {
      return 'Nuevo Producto';
    } else if (this.action == 'show') {
      return 'Ver Producto';
    } else {
      return 'Editar Producto';
    }
  }

  getButtonTitle() {
    if (this.action == 'create') {
      return 'Crear producto';
    } else {
      return 'Editar producto';
    }
  }

  onSubmit() {
    let body = {};
    if (this.action == 'create') {
      body = {
        title: this.productForm.value.name,
        price: this.productForm.value.price,
        description: this.productForm.value.description,
        image: this.productForm.value.image,
        category: '',
      };
      this.apiService.createProduct(body).subscribe((data) => {
        console.log(data);
        alert('Producto creado');
        this.location.back();
      });
    } else if (this.action == 'edit') {
      body = {
        title: this.productForm.value.name,
        price: this.productForm.value.price,
        description: this.productForm.value.description,
        image: this.productForm.value.image,
        category: '',
      };
      this.apiService.updateProduct(this.product.id, body).subscribe((data) => {
        alert('Producto Actualizado');
        this.location.back();
        console.log(data);
      });
    }
  }
}
