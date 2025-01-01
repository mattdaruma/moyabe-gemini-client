import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

@Component({
  selector: 'app-view-home',
  standalone: true,
  imports: [RouterModule, ClarityModule],
  templateUrl: './view-home.component.html',
  styleUrl: './view-home.component.scss'
})
export class ViewHomeComponent {

}
