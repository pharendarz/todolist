import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent],
  // todo common module - shared module?
  imports: [CommonModule, SharedModule],
  exports: [HeaderComponent],
})
export class LayoutModule {}
