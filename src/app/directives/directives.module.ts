import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TogglePasswordDirective } from './toggle-password.directive';
import { AlphaNumericDirective } from './alpha-numeric.directive';


@NgModule( {
  declarations: [
    TogglePasswordDirective,
    AlphaNumericDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TogglePasswordDirective,
    AlphaNumericDirective
  ]
} )
export class DirectivesModule {}
