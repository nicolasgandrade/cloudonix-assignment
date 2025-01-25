import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { RouterOutlet } from '@angular/router';
import { KeyValueEditorComponent } from './shared/components/key-value-editor/key-value-editor.component';
import { ProfileEditorComponent } from './shared/components/profile-editor/profile-editor.component';

@Component({
  selector: 'app-root',
  template: `<router-outlet />`,
  styles: `
    :host {
      display: block;
    }
  `,
  imports: [RouterOutlet],
})
export class AppComponent {
  title = 'cloudonix-assignment';

  constructor(injector: Injector) {
    const KeyValueEditor = createCustomElement(KeyValueEditorComponent, {
      injector,
    });
    const ProfileEditor = createCustomElement(ProfileEditorComponent, {
      injector,
    });

    customElements.define('key-value-editor', KeyValueEditor);
    customElements.define('profile-editor', ProfileEditor);
  }
}
