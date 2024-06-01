import { Clock } from '../../../core/15-kata-banking/Clock';

class TestableClock extends Clock {
  protected today(): Date {
    return new Date('2024-05-31');
  }
}

describe('The clock', () => {
  it('gets today date in dd/mm/yyyy format', () => {
    const clock = new TestableClock();
    const date = clock.todayAsString();
    expect(date).toEqual('31/05/2024');
  });
});
