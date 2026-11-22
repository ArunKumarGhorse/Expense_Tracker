import { TransactionService } from '../../services/transaction';
import { inject } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  imports: [FormsModule],
  selector: 'app-transaction',
  styleUrl: './transaction.css',
  templateUrl: './transaction.html',
})

export class Transaction {
  transactionService = inject<TransactionService>(TransactionService);
  router = inject(Router);



  value: 'income' | 'expense' = 'expense';
  successMessage = '';
  messageType: 'success' | 'error' = 'success';

  expenseName: string = '';
  amount: number = 0;
  date: string = '';

  addIncome(): void {
    this.value = 'income';
  }
  addExpense(): void {
    this.value = 'expense';
  }


  addTransaction(): void {
    if (!Number.isFinite(this.amount) || this.amount <= 0) {
      this.messageType = 'error';
      this.successMessage = 'Enter an amount greater than zero.';
      return;
    }

    if (this.value === 'expense' && this.expenseName.trim().length < 2) {
      this.messageType = 'error';
      this.successMessage = 'Enter an expense name with at least 2 characters.';
      return;
    }

    if (!this.date) {
      this.messageType = 'error';
      this.successMessage = 'Choose a transaction date.';
      return;
    }

    const data = {
      type: this.value,
      name: this.value === 'expense' ? this.expenseName.trim() : 'Income',
      amount: this.amount,
      date: this.date
    };

    if (this.value === 'expense' && this.amount > this.transactionService.totalBalance()) {
      this.messageType = 'error';
      this.successMessage = 'Insufficient Balance!';
      return;
    }

    this.transactionService.addTransaction(data);
    this.messageType = 'success';
    this.successMessage = 'Transaction added successfully.';
    this.router.navigate(['/dashboard']);
  }

}
