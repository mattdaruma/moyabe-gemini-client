import { Component, OnDestroy } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-markdown-clipboard-bar',
  standalone: true,
  imports: [CommonModule, ClarityModule, ClipboardModule],
  templateUrl: './markdown-clipboard-button.component.html',
  styleUrl: './markdown-clipboard-button.component.scss'
})
export class MarkdownClipboardButtonComponent implements OnDestroy {
  justCopied: boolean = false
  CopyCommand$ = new Subject<string>()
  private copySubscription: Subscription | null = null
  constructor(private cb: Clipboard) {
    this.copySubscription = this.CopyCommand$.pipe(
      tap({
        next: cmd => {
          this.justCopied = true
          this.cb.copy(cmd)
        }, error: err => {
          console.error('ERROR IN COPY COMMAND BEGIN', err)
        }, complete: () => { }
      }
      ),
      debounceTime(2000)
    ).subscribe({
      next: cmd => {
        this.justCopied = false
      }, error: err => {
        console.error('ERROR IN COPY COMMAND COMPLETE', err)
      }, complete: () => { }
    })
  }
  copyCode($event: any) {
    this.CopyCommand$.next($event?.target?.parentElement?.parentElement?.parentElement?.innerText ?? '')
  }
  ngOnDestroy(): void {
    this.copySubscription?.unsubscribe()
  }
}
