import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { TransactionService } from '../../services/transaction';

@Component({
  selector: 'app-history',
  imports: [CurrencyPipe],
  templateUrl: './history.html',
  styleUrl: './history.css'
})
export class History {

  transactionService = inject(TransactionService);

}