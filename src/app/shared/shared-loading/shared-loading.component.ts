import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ClarityModule } from '@clr/angular';

@Component({
  selector: 'app-shared-loading',
  standalone: true,
  imports: [CommonModule, ClarityModule],
  templateUrl: './shared-loading.component.html',
  styleUrl: './shared-loading.component.scss'
})
export class SharedLoadingComponent {
  @Input() Message: string | null = null
}
