export abstract class Delivery {
  constructor(readonly orderId: string) {}

  dispatchLabel(): string {
    if (this instanceof HomeDelivery) return this.orderId + " | " + this.street + " | " + this.postalCode;
    if (this instanceof PickupDelivery) return this.orderId + " | STORE " + this.storeCode;
    if (this instanceof LockerDelivery) {
      return this.orderId + " | LOCKER " + this.lockerCode + " | " + this.accessCode;
    }
    throw new Error("Delivery implementation is not supported");
  }
}

export class HomeDelivery extends Delivery {
  constructor(orderId: string, readonly street: string, readonly postalCode: string) { super(orderId); }
}

export class PickupDelivery extends Delivery {
  constructor(orderId: string, readonly storeCode: string) { super(orderId); }
}

export class LockerDelivery extends Delivery {
  private code: string;

  constructor(orderId: string, readonly lockerCode: string, accessCode: string) {
    super(orderId);
    this.code = "";
    this.changeAccessCode(accessCode);
  }

  get accessCode(): string { return this.code; }

  changeAccessCode(accessCode: string): void {
    if (!/^\d{4}$/.test(accessCode)) throw new Error("Access code must contain four digits");
    this.code = accessCode;
  }
}

export class ThermalPrinter {
  printEscPos(label: string): Uint8Array {
    return new TextEncoder().encode("\x1b@" + label + "\n\x1dV\x00");
  }
}

export class DispatchService {
  private readonly printer = new ThermalPrinter();

  print(delivery: Delivery): Uint8Array {
    return this.printer.printEscPos(delivery.dispatchLabel());
  }
}

export function updateLockerAccess(delivery: LockerDelivery, accessCode: string): string {
  delivery.changeAccessCode(accessCode);
  return delivery.dispatchLabel();
}
