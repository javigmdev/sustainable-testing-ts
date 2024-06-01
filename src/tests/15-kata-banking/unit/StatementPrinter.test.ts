import { Console } from '../../../core/15-kata-banking/Console';
import { StatementPrinter } from '../../../core/15-kata-banking/StatementPrinter';
import { Transaction } from '../../../core/15-kata-banking/Transaction';

describe('The Statement Printer', () => {
  const console = new Console();
  const consoleSpy = jest.spyOn(console, 'log');

  it('always prints the header throughout the console', () => {
    const statementPrinter = new StatementPrinter(console);
    statementPrinter.print([]);
    expect(consoleSpy).toHaveBeenCalledWith('Date | Amount | Balance');
  });

  it('prints a statement of account including multiple transactions throughout the console', () => {
    const statementPrinter = new StatementPrinter(console);
    const transactions = [
      new Transaction('25/03/2022', 500),
      new Transaction('26/03/2022', 500),
      new Transaction('27/03/2022', -200),
    ];

    statementPrinter.print(transactions);

    expect(consoleSpy).toHaveBeenCalledWith('Date | Amount | Balance');
    expect(consoleSpy).toHaveBeenCalledWith('27/03/2022 | -200.00 | 800.00');
    expect(consoleSpy).toHaveBeenCalledWith('26/03/2022 | 500.00 | 1000.00');
    expect(consoleSpy).toHaveBeenCalledWith('25/03/2022 | 500.00 | 500.00');
  });
});
