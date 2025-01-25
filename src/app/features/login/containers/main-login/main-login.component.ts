import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'main-login',
  templateUrl: './main-login.component.html',
  styles: `
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      min-width: 100vw;
    }
  `,
  imports: [FormsModule],
})
export class MainLoginComponent {
  token?: string;

  login(): void {}
}
