import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { LinkViewComponent } from './links/components/link-view/link-view.component';

const routes: Routes = [
  {
    path: 'links/:slug', component: LinkViewComponent
  },
  {
    path: 'links',
    canMatch: [AuthGuard],
    loadChildren: () => import('./links/links.module').then(m => m.LinksModule)
  },
  {
    path: 'categories',
    canMatch: [AuthGuard],
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
  },
  {
    path: 'passwordChange',
    canMatch: [AuthGuard],
    loadChildren: () => import('./auth/password-change/password-change.module').then(m => m.PasswordChangeModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
  },
  { path: '', pathMatch: 'full', redirectTo: 'links' },
  {
    path: '**',
    loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
