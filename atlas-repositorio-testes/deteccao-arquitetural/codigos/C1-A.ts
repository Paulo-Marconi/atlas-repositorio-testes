type Sale = { product: string; quantity: number; unitPriceCents: number };
type ReportMessage = { recipient: string; subject: string; attachment: string };

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

export class ReportMailer {
  constructor(private readonly pending: ReportMessage[]) {}

  schedule(recipient: string, reportName: string, body: string): void {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) throw new Error("Invalid recipient");
    const subject = "Monthly sales: " + reportName;
    const attachment = ["CONFIDENTIAL", body, "Prepared by the sales department"].join("\n");
    this.pending.push({ recipient, subject, attachment });
  }

  retryFor(recipient: string): ReportMessage[] {
    return this.pending.filter((message) => message.recipient === recipient).map((message) => ({ ...message }));
  }
}

export class ReportAdministration {
  constructor(private readonly documents: Map<string, string>, private readonly readers: Map<string, Set<string>>) {}

  grantReader(reportName: string, userId: string): void {
    const users = this.readers.get(reportName) ?? new Set<string>();
    users.add(userId);
    this.readers.set(reportName, users);
  }

  canRead(reportName: string, userId: string): boolean {
    return this.readers.get(reportName)?.has(userId) ?? false;
  }

  purgeExcept(retainedReports: ReadonlySet<string>): number {
    let removed = 0;
    for (const name of this.documents.keys()) {
      if (!retainedReports.has(name)) {
        this.documents.delete(name);
        this.readers.delete(name);
        removed += 1;
      }
    }
    return removed;
  }
}

export function recordSale(documents: Map<string, string>, reportName: string, entry: Sale): string {
  const report = new SalesReport(documents);
  report.append(reportName, entry);
  return report.generate(reportName);
}
