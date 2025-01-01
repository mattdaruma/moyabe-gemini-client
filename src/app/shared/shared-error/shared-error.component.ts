import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ClipboardModule } from '@angular/cdk/clipboard'
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@Component({
  selector: 'app-shared-error',
  standalone: true,
  imports: [CommonModule, ClarityModule, NgxJsonViewerModule, ClipboardModule],
  templateUrl: './shared-error.component.html',
  styleUrl: './shared-error.component.scss'
})
export class SharedErrorComponent {
  @Input() Message: string | null = null
  @Input() Error: any | null = null
  modalOpen: boolean = false
}
