type Stock = { take: (sku: string, units: number) => void; receive: (sku: string, units: number) => void };
type Allocation = { stock: Stock; sku: string; units: number };
type ReservationConfig = { maximumUnitsBySku: Map<string, number> };

export class Warehouse {
  readonly stock = new Map<string, number>();

  receive(sku: string, units: number): void {
    if (!Number.isInteger(units) || units <= 0) throw new Error("Invalid quantity");
    this.stock.set(sku, (this.stock.get(sku) ?? 0) + units);
  }

  take(sku: string, units: number): void {
    const available = this.stock.get(sku) ?? 0;
    if (!Number.isInteger(units) || units <= 0 || available < units) throw new Error("Insufficient stock");
    this.stock.set(sku, available - units);
  }

  available(sku: string): number { return this.stock.get(sku) ?? 0; }
}

export class ReservationBook {
  private readonly allocations = new Map<string, Allocation>();
  private readonly config: ReservationConfig;

  constructor(config: ReservationConfig) {
    for (const units of config.maximumUnitsBySku.values()) {
      if (!Number.isInteger(units) || units <= 0) throw new Error("Invalid reservation limit");
    }
    this.config = { ...config };
  }

  setMaximumUnits(sku: string, units: number): void {
    if (!Number.isInteger(units) || units <= 0) throw new Error("Invalid reservation limit");
    this.config.maximumUnitsBySku.set(sku, units);
  }

  reserve(stock: Stock, reservationId: string, sku: string, units: number): void {
    if (this.allocations.has(reservationId)) throw new Error("Duplicate reservation");
    const maximumUnits = this.config.maximumUnitsBySku.get(sku);
    if (maximumUnits === undefined || !Number.isInteger(units) || units <= 0 || units > maximumUnits) {
      throw new Error("Invalid reservation quantity");
    }
    stock.take(sku, units);
    this.allocations.set(reservationId, { stock, sku, units });
  }

  find(reservationId: string): Allocation | undefined { return this.allocations.get(reservationId); }

  release(reservationId: string): void {
    const allocation = this.allocations.get(reservationId);
    if (!allocation) throw new Error("Reservation not found");
    allocation.stock.receive(allocation.sku, allocation.units);
    this.allocations.delete(reservationId);
  }
}

export function reserveOrder(stock: Stock, book: ReservationBook, reservationId: string, sku: string, units: number) {
  book.reserve(stock, reservationId, sku, units);
  return { reservationId, allocation: book.find(reservationId) };
}
