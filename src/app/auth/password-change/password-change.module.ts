import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordChangeRoutingModule } from './password-change-routing.module';
import { PasswordChangeComponent } from './password-change.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';


@NgModule({
  declarations: [
    PasswordChangeComponent
  ],
  imports: [
    CommonModule,
    PasswordChangeRoutingModule,
    ReactiveFormsModule,
    AppMaterialModule
  ]
})
export class PasswordChangeModule { }
