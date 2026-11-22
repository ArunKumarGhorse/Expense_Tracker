import { Component, inject } from '@angular/core';
import { TransactionService } from '../../services/transaction';

@Component({
  selector: 'app-history',
  imports: [],
  templateUrl: './history.html',
  styleUrl: './history.css'
})
export class History {

  transactionService = inject(TransactionService);

}