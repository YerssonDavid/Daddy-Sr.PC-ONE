import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaintenanceOverlay } from './shared/maintenance-overlay/maintenance-overlay';
import { MaintenanceService } from './core/maintenance.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, MaintenanceOverlay],
  template: `
    @if (maintenance.active()) {
      <app-maintenance-overlay />
    }
    <router-outlet />
  `,
})
export class App {
  protected readonly maintenance = inject(MaintenanceService);
}
