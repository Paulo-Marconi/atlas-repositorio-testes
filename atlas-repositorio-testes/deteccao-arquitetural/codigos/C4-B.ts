type CustomerTier = "bronze" | "silver" | "gold";

export class DeliveryPricing {
  private remoteBaseCents = 1200;

  standardLocal(weightGrams: number): number {
    this.validate(weightGrams);
    return 400 + Math.ceil(weightGrams / 1000) * 200;
  }
  standardRegional(weightGrams: number): number {
    this.validate(weightGrams);
    return 700 + Math.ceil(weightGrams / 1000) * 200;
  }
  standardRemote(weightGrams: number): number {
    this.validate(weightGrams);
    return this.remoteBaseCents + Math.ceil(weightGrams / 1000) * 200;
  }
  expressLocal(weightGrams: number): number {
    this.validate(weightGrams);
    return 400 + Math.ceil(weightGrams / 1000) * 350 + 800;
  }
  expressRegional(weightGrams: number): number {
    this.validate(weightGrams);
    return 700 + Math.ceil(weightGrams / 1000) * 350 + 800;
  }
  expressRemote(weightGrams: number): number {
    this.validate(weightGrams);
    return this.remoteBaseCents + Math.ceil(weightGrams / 1000) * 350 + 800;
  }

  setRemoteBaseCents(amountCents: number): void {
    if (!Number.isInteger(amountCents) || amountCents <= 0) throw new Error("Invalid remote base price");
    this.remoteBaseCents = amountCents;
  }

  private validate(weightGrams: number): void {
    if (!Number.isInteger(weightGrams) || weightGrams <= 0) throw new Error("Invalid parcel weight");
  }
}

export class ShippingDiscount {
  apply(priceCents: number, tier: CustomerTier): number {
    switch (tier) {
      case "bronze": return priceCents;
      case "silver": return Math.round(priceCents * 0.95);
      case "gold": return Math.round(priceCents * 0.90);
    }
  }
}

export function quoteDeliveryOptions(pricing: DeliveryPricing, discount: ShippingDiscount,
  weightGrams: number, tier: CustomerTier) {
  return {
    standard: {
      local: discount.apply(pricing.standardLocal(weightGrams), tier),
      regional: discount.apply(pricing.standardRegional(weightGrams), tier),
      remote: discount.apply(pricing.standardRemote(weightGrams), tier),
    },
    express: {
      local: discount.apply(pricing.expressLocal(weightGrams), tier),
      regional: discount.apply(pricing.expressRegional(weightGrams), tier),
      remote: discount.apply(pricing.expressRemote(weightGrams), tier),
    },
  };
}
