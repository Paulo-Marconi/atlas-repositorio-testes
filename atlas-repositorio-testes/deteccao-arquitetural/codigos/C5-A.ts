type CustomerContext = { customerId: string; discountPercent: number };
type PaymentPolicy = { label: string; feeCents: (amountCents: number) => number };

let currentCustomer: CustomerContext = { customerId: "anonymous", discountPercent: 0 };
let taxPercent = 0;

export function selectCustomer(customerId: string, discountPercent: number): void {
  if (!Number.isInteger(discountPercent) || discountPercent < 0 || discountPercent > 100) {
    throw new Error("Invalid discount");
  }
  currentCustomer = { customerId, discountPercent };
}

export function configureTax(percent: number): void {
  if (!Number.isFinite(percent) || percent < 0 || percent > 100) throw new Error("Invalid tax");
  taxPercent = percent;
}

export class Checkout {
  quote(subtotalCents: number): { customerId: string; totalCents: number } {
    if (!Number.isInteger(subtotalCents) || subtotalCents < 0) throw new Error("Invalid subtotal");
    const discountedCents = Math.round(subtotalCents * (100 - currentCustomer.discountPercent) / 100);
    return {
      customerId: currentCustomer.customerId,
      totalCents: discountedCents + Math.round(discountedCents * taxPercent / 100),
    };
  }

  quoteForPayment(subtotalCents: number, policy: PaymentPolicy) {
    const quote = this.quote(subtotalCents);
    const fee = policy.feeCents(quote.totalCents);
    if (!Number.isInteger(fee) || fee < 0) throw new Error("Invalid payment fee");
    return { ...quote, totalCents: quote.totalCents + fee, paymentLabel: policy.label };
  }

  reserveQuote(subtotalCents: number) {
    return { ...this.quote(subtotalCents), expiresAtMillis: Date.now() + 15 * 60_000 };
  }
}

export function startCheckout(customerId: string, discountPercent: number): Checkout {
  selectCustomer(customerId, discountPercent);
  return new Checkout();
}
