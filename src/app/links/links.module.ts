import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { ConfirmationDialogComponent } from '../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component';
import { LinksRoutingModule } from './links-routing.module';
import { LinksComponent } from './containers/links/links.component';
import { LinkViewComponent } from './components/link-view/link-view.component';
import { LinksListComponent } from './components/links-list/links-list.component';
import { LinkFormComponent } from './containers/link-form/link-form.component';
import { LinkShowComponent } from './components/link-show/link-show.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    LinksComponent,
    LinksListComponent,
    LinkViewComponent,
    LinkFormComponent,
    LinkShowComponent
  ],
  imports: [
    CommonModule,
    LinksRoutingModule,
    ReactiveFormsModule,
    AppMaterialModule,
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    PipesModule
  ]
})
export class LinksModule { }
