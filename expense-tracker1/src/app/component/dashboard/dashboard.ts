import { Component, inject } from '@angular/core';
import { TransactionService } from '../../services/transaction';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-dashboard',
  standalone: true,
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  userName:string="Arun Ghorse";
  totalBalance:number=10000;
  totalIncome:number=22000;
  totalExpense:number=5000;
  transactionService = inject(TransactionService);

}
