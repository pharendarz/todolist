import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TemperatureColorPipe } from '../pipes/temperature-color.pipe';
import { CustomSnackbarComponent } from '../components/snackbar/snackbar.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TemperatureColorPipe, CustomSnackbarComponent],
  imports: [FontAwesomeModule, CommonModule],
  exports: [FontAwesomeModule, TemperatureColorPipe, CustomSnackbarComponent],
})
export class SharedModule {}
