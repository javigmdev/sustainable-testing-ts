export class Clock {
  todayAsString() {
    const today = this.today();
    return today.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

  protected today() {
    return new Date();
  }
}
