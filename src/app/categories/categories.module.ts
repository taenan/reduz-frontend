import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { ConfirmationDialogComponent } from '../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './containers/categories/categories.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoryFormComponent } from './containers/category-form/category-form.component';

@NgModule({
  declarations: [CategoriesComponent, CategoriesListComponent, CategoryFormComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ReactiveFormsModule,
    AppMaterialModule,
    ErrorDialogComponent,
    ConfirmationDialogComponent
  ]
})
export class CategoriesModule { }
