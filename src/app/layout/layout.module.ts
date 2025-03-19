import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ListComponent } from '../components/list/list.component';

@NgModule({
  declarations: [HeaderComponent],
  // todo common module - shared module?
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [HeaderComponent],
})
export class LayoutModule {}
