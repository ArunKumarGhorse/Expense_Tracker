import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  transactions = signal<any[]>(
    JSON.parse(localStorage.getItem('transactions')||'[]')
  );

  totalIncome = computed(() =>
    this.transactions()
      .filter(item => item.type === 'income')
      .reduce((sum, item) => sum + Number(item.amount), 0)
  );
  totalExpense = computed(() =>
    this.transactions()
      .filter(item => item.type === 'expense')
      .reduce((sum, item) => sum + Number(item.amount), 0)
  );

  totalBalance = computed(() =>
    this.totalIncome() - this.totalExpense()
  );

  addTransaction(data: any) {
    this.transactions.update(oldData => [...oldData, data]);
    localStorage.setItem('transactions',JSON.stringify(this.transactions()));
  }
  deleteTransaction(index: number) {
    this.transactions.update(data =>
        data.filter((_, i) => i !== index)
    );
    localStorage.setItem('transactions',JSON.stringify(this.transactions()));
}
}