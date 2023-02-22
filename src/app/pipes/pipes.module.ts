import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncateTextPipe } from './truncate-text.pipe';
import { DatePtPipe } from './date-pt.pipe';

const pipes = [TruncateTextPipe, DatePtPipe]
@NgModule({
  
  declarations: pipes,
  imports: [
    CommonModule
  ],
  exports: [
    pipes
  ]
})
export class PipesModule { }
