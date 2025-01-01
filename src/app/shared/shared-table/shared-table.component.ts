import { Component, Input } from '@angular/core';
import { SharedTableColumn } from './shared-table-column.interface';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shared-table',
  standalone: true,
  imports: [CommonModule, ClarityModule, RouterModule],
  templateUrl: './shared-table.component.html',
  styleUrl: './shared-table.component.scss'
})
export class SharedTableComponent {
  @Input() Columns: SharedTableColumn[] = []
  @Input() Data: any[] = []
}
