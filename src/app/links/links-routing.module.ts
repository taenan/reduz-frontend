import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LinksComponent } from './containers/links/links.component';
import { LinkResolver } from './resolvers/link.resolver'
import { LinkFormComponent } from './containers/link-form/link-form.component';

const routes: Routes = [
  { path: '', component: LinksComponent },
  { path: 'new', component: LinkFormComponent, resolve: { category: LinkResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinksRoutingModule { }
