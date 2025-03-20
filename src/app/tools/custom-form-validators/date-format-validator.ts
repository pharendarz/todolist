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

    const [yearStr, monthStr, dayStr] = control.value.split('-');

    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10) - 1;
    const day = parseInt(dayStr, 10);

    const date = new Date(year, month, day);

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month ||
      date.getDate() !== day
    ) {
      return { invalidDate: true };
    }

    return null;
  };
}
