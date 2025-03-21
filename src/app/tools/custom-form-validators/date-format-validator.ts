import { parse } from './../../../../node_modules/@fortawesome/fontawesome-svg-core/index.d';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateFormatValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    // Regex for YYYY-MM-DD format
    const datePattern =
      /^\d{4}-([0][1-9]|[1][0-2])-([0][1-9]|[12][0-9]|3[01])$/;

    if (!datePattern.test(control.value)) {
      return { invalidDate: true };
    }

    const dateObj = parseDate(control.value);

    if (
      dateObj.date.getFullYear() !== dateObj.year ||
      dateObj.date.getMonth() !== dateObj.month ||
      dateObj.date.getDate() !== dateObj.day
    ) {
      return { invalidDate: true };
    }

    return null;
  };
}

export function parseDate(dateString: string): {
  date: Date;
  year: number;
  month: number;
  day: number;
} {
  const [yearStr, monthStr, dayStr] = dateString.split('-');

  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10) - 1;
  const day = parseInt(dayStr, 10);

  return { date: new Date(year, month, day), year, month, day };
}
