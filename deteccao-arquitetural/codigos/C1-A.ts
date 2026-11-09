type Sale = { product: string; quantity: number; unitPriceCents: number };
type SubscriptionTerms = { monthlyCents: number; seats: number };

function validateSubscription(terms: SubscriptionTerms): void {
  if (!Number.isInteger(terms.monthlyCents) || terms.monthlyCents < 0 ||
      !Number.isInteger(terms.seats) || terms.seats <= 0) throw new Error("Invalid subscription");
}

export class SalesReport {
  constructor(private readonly documents: Map<string, string>) {}

  private validate(entry: Sale): void {
    if (typeof entry.product !== "string" || !Number.isInteger(entry.quantity) ||
        entry.quantity <= 0 || !Number.isInteger(entry.unitPriceCents) || entry.unitPriceCents < 0) {
      throw new Error("Invalid sale");
    }
  }

  load(name: string): Sale[] {
    const document = this.documents.get(name);
    if (document === undefined) throw new Error("Report not found");
    const entries: Sale[] = JSON.parse(document);
    entries.forEach((entry) => this.validate(entry));
    return entries;
  }

  append(name: string, entry: Sale): void {
    this.validate(entry);
    const entries = this.documents.has(name) ? this.load(name) : [];
    entries.push({ ...entry });
    this.documents.set(name, JSON.stringify(entries));
  }

  calculate(entries: Sale[]): number {
    return entries.reduce((total, item) => total + item.quantity * item.unitPriceCents, 0);
  }

  render(entries: Sale[]): string {
    const rows = entries.map((entry) => entry.product + ": " + entry.quantity + " x " + entry.unitPriceCents);
    return ["SALES REPORT", ...rows, "TOTAL: " + this.calculate(entries)].join("\n");
  }

  generate(name: string): string {
    return this.render(this.load(name));
  }
}

export class ReportAccount {
  private readonly readers = new Set<string>();
  private unpaidCents = 0;

  grantReader(userId: string): void { this.readers.add(userId); }
  revokeReader(userId: string): void { this.readers.delete(userId); }
  canRead(userId: string): boolean { return this.readers.has(userId); }

  chargeSubscription(terms: SubscriptionTerms): number {
    validateSubscription(terms);
    const charge = terms.monthlyCents + Math.max(0, terms.seats - 3) * 500;
    this.unpaidCents += charge;
    return charge;
  }

  pay(amountCents: number): void {
    if (!Number.isInteger(amountCents) || amountCents <= 0 || amountCents > this.unpaidCents) {
      throw new Error("Invalid payment");
    }
    this.unpaidCents -= amountCents;
  }

  outstandingCents(): number { return this.unpaidCents; }
}

export class SubscriptionPreview {
  quote(terms: SubscriptionTerms): number {
    validateSubscription(terms);
    return terms.monthlyCents + Math.max(0, terms.seats - 3) * 500;
  }
}

export function openSubscription(account: ReportAccount, preview: SubscriptionPreview,
  userId: string, terms: SubscriptionTerms) {
  const quotedCents = preview.quote(terms);
  const chargedCents = account.chargeSubscription(terms);
  account.grantReader(userId);
  return { quotedCents, chargedCents, outstandingCents: account.outstandingCents() };
}

export function recordSale(documents: Map<string, string>, reportName: string, entry: Sale): string {
  const report = new SalesReport(documents);
  report.append(reportName, entry);
  return report.generate(reportName);
}
