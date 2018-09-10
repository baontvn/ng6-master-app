import { Component} from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `<div class="spinner-container d-flex justify-content-center align-items-center">
  <div class="spinner"></div></div>`,
  styleUrls: [
      'spinner.scss'
    ]
})
export class SpinnerComponent {}
