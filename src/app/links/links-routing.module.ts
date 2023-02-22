import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LinkViewComponent } from './components/link-view/link-view.component';
import { LinksComponent } from './containers/links/links.component';

const routes: Routes = [
  { path: '', component: LinksComponent },
  { path: ':slug', component: LinkViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinksRoutingModule { }
