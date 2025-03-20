import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ListComponent } from '../components/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from '../components/list/add/add.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ListComponent,
    AddComponent,
    SpinnerComponent,
  ],
  // todo common module - shared module?
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],

  exports: [HeaderComponent],
})
export class LayoutModule {}
