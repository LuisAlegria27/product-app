import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit{
  productForm: FormGroup;

    constructor(private fb: FormBuilder, private route: ActivatedRoute) {
      this.productForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]], //Las comillas vacias son para poner valores iniciales, en nuestro caso estan vacios
        price: ['', [Validators.required, Validators.min(0)]],
        stock: ['', [Validators.required, Validators.min(0)]],
        image: [''],
        description: ['']
      })
    }

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        console.log(params);

         //this.product = JSON.parse(params['data']);
        });

    }

    onSubmit(){

    }
}
