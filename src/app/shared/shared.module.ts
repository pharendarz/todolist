import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TemperatureColorPipe } from '../pipes/temperature-color.pipe';
import { CustomSnackbarComponent } from '../components/snackbar/snackbar.component';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TemperatureColorPipe,
    CustomSnackbarComponent,
    NotFoundComponent,
  ],
  imports: [FontAwesomeModule, CommonModule, RouterModule],
  exports: [
    FontAwesomeModule,
    TemperatureColorPipe,
    CustomSnackbarComponent,
    NotFoundComponent,
  ],
})
export class SharedModule {}
