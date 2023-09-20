import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AuthGuard } from './auth.guard'; // ajusta la ruta según necesites
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { MatTableModule } from '@angular/material/table';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'products/detail', component: ProductDescriptionComponent},
  {path: 'products/table', component: ProductTableComponent},
  {path: 'products/form', component: ProductFormComponent}
]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
