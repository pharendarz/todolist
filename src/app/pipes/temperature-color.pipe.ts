import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatureColor',
  pure: true,
})
export class TemperatureColorPipe implements PipeTransform {
  transform(temperature: number | string | undefined): string {
    if (temperature === undefined || temperature === null) {
      return 'text-gray-500';
    }

    const temp =
      typeof temperature === 'string' ? parseFloat(temperature) : temperature;

    if (temp <= 0) {
      return 'text-blue-500'; // Freezing
    } else if (temp <= 10) {
      return 'text-yellow-500'; // Cold
    } else if (temp <= 20) {
      return 'text-orange-500'; // Moderate
    } else {
      return 'text-red-500'; // Hot
    }
  }
}
