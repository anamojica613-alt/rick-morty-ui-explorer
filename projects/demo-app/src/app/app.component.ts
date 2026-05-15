import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExplorerComponent } from './pages/explorer/explorer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExplorerComponent],
  template: `<app-explorer />`,
})
export class AppComponent {}
