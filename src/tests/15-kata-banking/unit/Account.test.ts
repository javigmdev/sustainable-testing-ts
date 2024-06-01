import { Account } from '../../../core/15-kata-banking/Account';
import { Clock } from '../../../core/15-kata-banking/Clock';
import { Console } from '../../../core/15-kata-banking/Console';
import { StatementPrinter } from '../../../core/15-kata-banking/StatementPrinter';
import { Transaction } from '../../../core/15-kata-banking/Transaction';
import { TransactionRepository } from '../../../core/15-kata-banking/TransactionRepository';

describe('The account', () => {
  const clock = new Clock();
  const repository = new TransactionRepository(clock);
  const statementPrinter = new StatementPrinter(new Console());
  const account = new Account(repository, statementPrinter);
  const addDepositSpy = jest.spyOn(repository, 'addDeposit');
  const addWithdrawalSpy = jest.spyOn(repository, 'addWithdrawal');
  const printerSpy = jest.spyOn(statementPrinter, 'print');

  it('stores a deposit transaction throughout the repository', () => {
    account.deposit(100);

    expect(addDepositSpy).toHaveBeenCalledWith(100);
  });

  it('stores a withdrawal transaction throughout the repository', () => {
    account.withdraw(100);

    expect(addWithdrawalSpy).toHaveBeenCalledWith(100);
  });

  it('prints a statement throughout the statement printer', () => {
    const transactions = [
      new Transaction(clock.todayAsString(), 0),
      new Transaction(clock.todayAsString(), 0),
    ];
    repository.allTransactions = () => transactions;

    account.printStatement();

    expect(printerSpy).toHaveBeenCalledWith(transactions);
  });
});
