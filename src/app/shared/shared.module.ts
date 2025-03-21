import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [FontAwesomeModule, CommonModule, RouterModule],
  exports: [FontAwesomeModule],
})
export class SharedModule {}
