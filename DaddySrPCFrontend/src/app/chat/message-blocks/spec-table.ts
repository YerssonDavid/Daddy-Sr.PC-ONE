import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface TableBlock {
  kind: 'table';
  head: string[];
  rows: string[][];
}

/** Tabla de compatibilidad de componentes (doc §6.3) */
@Component({
  selector: 'app-spec-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="spec-table-wrap" role="region" aria-label="Tabla de especificaciones">
      <table class="spec-table">
        <thead>
          <tr>
            @for (col of data().head; track $index) {
              <th scope="col">{{ col }}</th>
            }
          </tr>
        </thead>
        <tbody>
          @for (row of data().rows; track $index) {
            <tr>
              @for (cell of row; track $index) {
                <td>{{ cell }}</td>
              }
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .spec-table-wrap {
      overflow-x: auto;
      border-radius: var(--radius-sm);
      border: 1px solid var(--glass-border);
      margin-block: 0.5rem;
    }

    .spec-table {
      width: 100%;
      border-collapse: collapse;
      font-family: var(--font-mono);
      font-size: var(--fs-mono-sm);

      th, td {
        padding: 0.5rem 0.75rem;
        text-align: left;
        white-space: nowrap;
      }

      th {
        background: var(--bg-elevated);
        color: var(--trace);
        font-weight: 500;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        font-size: 0.65rem;
        border-bottom: 1px solid var(--glass-border);
      }

      td {
        color: var(--text-primary);
        border-bottom: 1px solid var(--glass-border);
      }

      tr:last-child td {
        border-bottom: none;
      }

      tr:nth-child(even) td {
        background: color-mix(in srgb, var(--bg-elevated) 40%, transparent);
      }
    }
  `],
})
export class SpecTable {
  readonly data = input.required<TableBlock>();
}
