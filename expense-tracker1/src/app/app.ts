import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Dashboard } from './component/dashboard/dashboard';
import { Transaction } from './component/transaction/transaction';

@Component({
  imports: [RouterOutlet, RouterLink, Dashboard, Transaction],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('expense-tracker');
  isDark = false;

  toggleTheme() {
    this.isDark = !this.isDark;
  }
}
