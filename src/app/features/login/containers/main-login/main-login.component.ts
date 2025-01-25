import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../../../shared/services/authorization.service';

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

  private readonly authService = inject(AuthorizationService);
  private readonly router = inject(Router);

  login(): void {
    this.authService.setAuthToken(this.token!);
    this.router.navigate(['products']);
  }
}
