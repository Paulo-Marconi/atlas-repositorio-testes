type WorkRecord = { employeeId: string; minutes: number };
type Payslip = { employeeId: string; grossCents: number };
export class CsvPayslipArchive {
  private readonly rows: string[] = [];

  appendCsvRow(row: string): void { this.rows.push(row); }
  contents(): string { return ["employeeId,grossCents", ...this.rows].join("\r\n"); }
}

export class WorkLedger {
  private readonly records = new Map<string, number>();

  constructor(records: readonly WorkRecord[]) {
    for (const record of records) {
      if (!Number.isInteger(record.minutes) || record.minutes < 0) throw new Error("Invalid work duration");
      this.records.set(record.employeeId, record.minutes);
    }
  }

  static minutesFor(ledger: WorkLedger, employeeId: string): number {
    const minutes = ledger.records.get(employeeId);
    if (minutes === undefined) throw new Error("Work record unavailable");
    return minutes;
  }
}

export class PayrollService {
  constructor(private readonly ledger: WorkLedger, private readonly archive: CsvPayslipArchive) {}

  issue(employeeId: string, hourlyRateCents: number): Payslip {
    if (!Number.isInteger(hourlyRateCents) || hourlyRateCents <= 0) throw new Error("Invalid hourly rate");
    const minutes = WorkLedger.minutesFor(this.ledger, employeeId);
    const slip = { employeeId, grossCents: Math.round(minutes * hourlyRateCents / 60) };
    const employeeField = '"' + slip.employeeId.replace(/"/g, '""') + '"';
    this.archive.appendCsvRow(employeeField + "," + slip.grossCents);
    return slip;
  }
}

export class PayrollBatch {
  constructor(private readonly ledger: WorkLedger, private readonly archive: CsvPayslipArchive) {}

  process(employees: ReadonlyArray<{ employeeId: string; hourlyRateCents: number }>): Payslip[] {
    const payroll = new PayrollService(this.ledger, this.archive);
    return employees.map((employee) => payroll.issue(employee.employeeId, employee.hourlyRateCents));
  }
}

export function processPayroll(
  batch: PayrollBatch,
  employees: ReadonlyArray<{ employeeId: string; hourlyRateCents: number }>
): Payslip[] {
  return batch.process(employees);
}
