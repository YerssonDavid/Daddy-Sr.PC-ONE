import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MaintenanceService {
  readonly active = signal(false);

  async check(): Promise<void> {
    try {
      const res = await fetch('/api/maintenance');
      const data: { active: boolean } = await res.json();
      this.active.set(data.active);
    } catch {
      this.active.set(environment.maintenanceMode ?? false);
    }
  }
}
