import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidateService } from '../core/services/validate.service';

@Component({
  selector: 'app-control-error',
  template: `
    <mat-error class="error-message" *ngIf="errorMessage !== null">{{errorMessage}}</mat-error>
  `,
})
export class ControlErrorComponent {
  @Input() control: FormControl;
  constructor() { }

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched
      ) {
        return ValidateService.getValidatorErrorMessage(
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }

    return null;
  }
}
