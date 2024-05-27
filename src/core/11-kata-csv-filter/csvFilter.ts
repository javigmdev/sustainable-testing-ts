export class CsvFilter {
  constructor(private readonly lines: string[]) {}
  static create(lines: string[]) {
    if (lines.length === 1) {
      throw new Error('Single line is not allowed');
    }
    return new CsvFilter(lines);
  }

  get filteredLines() {
    if (this.lines.length === 0) {
      return [];
    }
    const header = this.lines[0];
    const invoices = this.lines.slice(1);
    return [header].concat(
      this.takeRepeatedInvoiceIds(this.takeValidInvoices(invoices)),
    );
  }

  private takeValidInvoices(invoices: string[]) {
    return invoices.filter(this.isValidInvoice);
  }

  private isValidInvoice = invoice => {
    const fields = invoice.split(',');
    const ivaField = fields[4];
    const igicField = fields[5];
    const decimalRegex = '\\d+(\\.\\d+)?';
    const areTaxFieldsMutuallyExclusive =
      (ivaField.match(decimalRegex) || igicField.match(decimalRegex)) &&
      (!ivaField || !igicField);
    const grossAmountField = fields[2];
    const netAmountField = fields[3];
    const isNetAmountCorrect =
      this.hasCorrectAmount(netAmountField, grossAmountField, ivaField) ||
      this.hasCorrectAmount(netAmountField, grossAmountField, igicField);
    const areIdentifierFieldsMutuallyExclusive = !fields[7] || !fields[8];
    return (
      areTaxFieldsMutuallyExclusive &&
      isNetAmountCorrect &&
      areIdentifierFieldsMutuallyExclusive
    );
  };

  private hasCorrectAmount(
    netAmountField: string,
    grossAmountField: string,
    ivaField: string,
  ) {
    const parsedNetAmount = parseFloat(netAmountField);
    const parsedGrossAmount = parseFloat(grossAmountField);
    const parsedTaxField = parseFloat(ivaField);
    return (
      parsedNetAmount ===
      parsedGrossAmount - (parsedGrossAmount * parsedTaxField) / 100
    );
  }

  private takeRepeatedInvoiceIds(invoices: string[]) {
    const invoicesIds = invoices.map(invoice => this.invoiceId(invoice));
    const duplicatedIds = invoicesIds.filter(
      (id, index) => invoicesIds.indexOf(id) !== index,
    );
    return invoices.filter(
      invoice => !duplicatedIds.includes(this.invoiceId(invoice)),
    );
  }

  private invoiceId(invoice: string) {
    return invoice.split(',')[0];
  }
}
