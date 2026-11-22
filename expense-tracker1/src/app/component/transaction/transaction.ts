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



  value: string = 'expense';
  successMessage = '';

  expenseName: string = '';
  amount: number = 0;
  date: string = '';

  addIncome(): void {
    this.value = 'income';
  }
  addExpense(): void {
    this.value = 'expense';
  }


  addTransaction() {

    const data = {
      type: this.value,
      name: this.value === 'expense' ? this.expenseName : 'Income',
      amount: this.amount,
      date: this.date
    };
     if(this.amount<0){
    this.successMessage="Please Enter Valid Amount";
    return;
  }
    if (this.value === 'expense' && this.amount > this.transactionService.totalBalance()) {
      this.successMessage = 'Insufficient Balance!';
      return;
    }
    this.transactionService.addTransaction(data);
    this.successMessage = "Transaction Added Successfully";
    this.router.navigate(['/dashboard']);
  }

}
