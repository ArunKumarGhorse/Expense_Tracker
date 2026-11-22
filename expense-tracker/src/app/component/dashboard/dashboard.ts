import { Component, computed, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { TransactionService } from '../../services/transaction';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CurrencyPipe, RouterLink],
  selector: 'app-dashboard',
  standalone: true,
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  transactionService = inject(TransactionService);
  recentTransactions = computed(() =>
    [...this.transactionService.transactions()].slice(-5).reverse()
  );
}
