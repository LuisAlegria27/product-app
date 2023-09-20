import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // ajusta la ruta según necesites
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  
  constructor(private authService: AuthService,  private fg: FormBuilder, private router: Router) { 
    this.loginForm = this.fg.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  ngOnInit(): void {
  }
onSubmit(): void {
  if(this.loginForm.valid){
    console.log(this.loginForm.value);
  //  this.authService.login();
   this.router.navigate(['/products']);
  }else{
    console.log('Formulario invalido');
  }
}
}
