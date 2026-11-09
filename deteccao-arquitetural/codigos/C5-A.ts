type CustomerContext = { customerId: string; discountPercent: number };
type PaymentPolicy = { label: string; feeCents: (amountCents: number) => number };
type Quote = { customerId: string; totalCents: number };

let checkoutContext: { customer: CustomerContext; taxPercent: number } = {
  customer: { customerId: "anonymous", discountPercent: 0 },
  taxPercent: 0,
};

export function selectCustomer(customerId: string, discountPercent: number): void {
  if (!Number.isInteger(discountPercent) || discountPercent < 0 || discountPercent > 100) {
    throw new Error("Invalid discount");
  }
  checkoutContext = { ...checkoutContext, customer: { customerId, discountPercent } };
}

export function configureTax(percent: number): void {
  if (!Number.isFinite(percent) || percent < 0 || percent > 100) throw new Error("Invalid tax");
  checkoutContext = { ...checkoutContext, taxPercent: percent };
}

export class Checkout {
  private static readonly quotes = new Map<string, Quote>();

  quote(subtotalCents: number): Quote {
    if (!Number.isInteger(subtotalCents) || subtotalCents < 0) throw new Error("Invalid subtotal");
    const discountedCents = Math.round(subtotalCents * (100 - checkoutContext.customer.discountPercent) / 100);
    return {
      customerId: checkoutContext.customer.customerId,
      totalCents: discountedCents + Math.round(discountedCents * checkoutContext.taxPercent / 100),
    };
  }

  cachedQuote(quoteId: string, subtotalCents: number): Quote {
    if (!quoteId.trim()) throw new Error("Quote ID is required");
    if (!Number.isInteger(subtotalCents) || subtotalCents < 0) throw new Error("Invalid subtotal");
    const cached = Checkout.quotes.get(quoteId);
    if (cached) return { ...cached };
    const quote = this.quote(subtotalCents);
    Checkout.quotes.set(quoteId, { ...quote });
    return quote;
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
