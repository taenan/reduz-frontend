import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './containers/categories/categories.component';
import { CategoryResolver } from './resolvers/category.resolver'
import { CategoryFormComponent } from './containers/category-form/category-form.component';

const routes: Routes = [
  { path: '', component: CategoriesComponent },
  { path: 'new', component: CategoryFormComponent, resolve: { category: CategoryResolver } },
  { path: 'edit/:id', component: CategoryFormComponent, resolve: { category: CategoryResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
