type Stock = { take: (sku: string, units: number) => void; receive: (sku: string, units: number) => void };
type Allocation = { stock: Stock; sku: string; units: number };

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
  public maximumUnits = 100;

  setMaximumUnits(units: number): void {
    if (!Number.isInteger(units) || units <= 0) throw new Error("Invalid reservation limit");
    this.maximumUnits = units;
  }

  reserve(stock: Stock, reservationId: string, sku: string, units: number): void {
    if (this.allocations.has(reservationId)) throw new Error("Duplicate reservation");
    if (!Number.isInteger(units) || units <= 0 || units > this.maximumUnits) {
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
