import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionService } from '../../services/transaction';
import { History } from './history';

describe('History', () => {
  let component: History;
  let fixture: ComponentFixture<History>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [History],
      providers: [
        {
          provide: TransactionService,
          useValue: { transactions: () => [], deleteTransaction: () => undefined },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(History);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
