import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { vi } from 'vitest';
import { TransactionService } from '../../services/transaction';
import { Transaction } from './transaction';

describe('Transaction', () => {
  let component: Transaction;
  let fixture: ComponentFixture<Transaction>;
  const transactionService = {
    totalBalance: vi.fn(() => 1000),
    addTransaction: vi.fn(),
  };
  const router = { navigate: vi.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Transaction],
      providers: [
        { provide: TransactionService, useValue: transactionService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    transactionService.addTransaction.mockClear();
    router.navigate.mockClear();
    fixture = TestBed.createComponent(Transaction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a valid expense and navigate to the dashboard', () => {
    component.expenseName = 'Groceries';
    component.amount = 25;
    component.date = '2026-11-22';

    component.addTransaction();

    expect(transactionService.addTransaction).toHaveBeenCalledWith({
      type: 'expense',
      name: 'Groceries',
      amount: 25,
      date: '2026-11-22',
    });
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
