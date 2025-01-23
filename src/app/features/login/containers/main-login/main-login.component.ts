import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'main-login',
  imports: [FormsModule],
  templateUrl: './main-login.component.html',
})
export class MainLoginComponent {
  token?: string;
}
