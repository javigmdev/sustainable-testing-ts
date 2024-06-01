import { Clock } from '../../../core/15-kata-banking/Clock';
import { Transaction } from '../../../core/15-kata-banking/Transaction';
import { TransactionRepository } from '../../../core/15-kata-banking/TransactionRepository';

describe('The Transaction Repository', () => {
  const today = '25/03/2022';
  const clock = new Clock();
  clock.todayAsString = () => today;
  let repository: TransactionRepository;

  beforeEach(() => {
    repository = new TransactionRepository(clock);
  });

  it('stores a deposit transaction for a given amount', () => {
    const amount = 100;

    repository.addDeposit(amount);

    const transactions = repository.allTransactions();
    expect(transactions[0]).toEqual(new Transaction(today, amount));
  });

  it('stores a withdrawal transaction for a given amount', () => {
    const amount = 100;

    repository.addWithdrawal(amount);

    const transactions = repository.allTransactions();
    expect(transactions[0]).toEqual(new Transaction(today, -amount));
  });
});
