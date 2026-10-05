type Receipt = { totalCents: number };
type ReceiptSource = { load: (id: string) => Receipt };
type ReceiptEnvironment = { source: ReceiptSource; currency: string };

let receiptEnvironment: ReceiptEnvironment | undefined;

export function configureReceipts(source: ReceiptSource, currency: string): void {
  if (!currency.trim()) throw new Error("Currency is required");
  receiptEnvironment = { source, currency };
}

export class ReceiptBuilder {
  private static readonly receipts = new Map<string, Receipt>();

  build(id: string): string {
    if (!receiptEnvironment) throw new Error("Receipt environment is not configured");
    const { source, currency } = receiptEnvironment;
    let receipt = ReceiptBuilder.receipts.get(id);
    if (!receipt) {
      const loaded = source.load(id);
      if (!Number.isInteger(loaded.totalCents) || loaded.totalCents < 0) throw new Error("Invalid receipt");
      receipt = { ...loaded };
      ReceiptBuilder.receipts.set(id, receipt);
    }
    return id + " | " + currency + " " + (receipt.totalCents / 100).toFixed(2);
  }
}

export function generateReceipts(receiptIds: string[]): string[] {
  const builder = new ReceiptBuilder();
  return receiptIds.map((id) => builder.build(id));
}
