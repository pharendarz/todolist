import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TemperatureColorPipe } from '../pipes/temperature-color.pipe';

@NgModule({
  declarations: [TemperatureColorPipe],
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule, TemperatureColorPipe],
})
export class SharedModule {}
