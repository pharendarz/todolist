import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TextFilterPipe } from '../pipes/text-filter.pipe';

@NgModule({
  declarations: [TextFilterPipe],
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule, TextFilterPipe],
})
export class SharedModule {}
