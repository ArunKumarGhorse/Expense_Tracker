import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { TransactionService } from './transaction';

describe('TransactionService', () => {
  let service: TransactionService;
  const storage = new Map<string, string>();
  const localStorageMock = {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
    clear: () => storage.clear(),
  };

  beforeEach(() => {
    vi.stubGlobal('localStorage', localStorageMock);
    localStorageMock.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionService);
  });

  afterEach(() => {
    localStorageMock.clear();
    vi.unstubAllGlobals();
  });

  it('calculates balances and persists additions and deletions', () => {
    const income = { type: 'income', name: 'Salary', amount: 5000, date: '2026-11-22' };
    const expense = { type: 'expense', name: 'Food', amount: 1200, date: '2026-11-22' };

    service.addTransaction(income);
    service.addTransaction(expense);

    expect(service.totalIncome()).toBe(5000);
    expect(service.totalExpense()).toBe(1200);
    expect(service.totalBalance()).toBe(3800);
    expect(JSON.parse(localStorage.getItem('transactions')!)).toEqual([income, expense]);

    service.deleteTransaction(1);

    expect(service.totalExpense()).toBe(0);
    expect(service.totalBalance()).toBe(5000);
    expect(JSON.parse(localStorage.getItem('transactions')!)).toEqual([income]);
  });
});
