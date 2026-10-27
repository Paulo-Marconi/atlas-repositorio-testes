type CustomerTier = "bronze" | "silver" | "gold";
type Packaging = "envelope" | "box" | "tube";

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

export class PackagingPolicy {
  additionalCents(packaging: Packaging): number {
    switch (packaging) {
      case "envelope": return 100;
      case "box": return 300;
      case "tube": return 250;
    }
  }

  description(packaging: Packaging): string {
    switch (packaging) {
      case "envelope": return "Padded envelope";
      case "box": return "Cardboard box";
      case "tube": return "Protective tube";
    }
  }
}

export function quoteDeliveryOptions(pricing: DeliveryPricing, discount: ShippingDiscount, packagingPolicy: PackagingPolicy,
  weightGrams: number, tier: CustomerTier, packaging: Packaging) {
  const additionalCents = packagingPolicy.additionalCents(packaging);
  const total = (priceCents: number) => discount.apply(priceCents, tier) + additionalCents;
  return {
    packaging: packagingPolicy.description(packaging),
    standard: {
      local: total(pricing.standardLocal(weightGrams)),
      regional: total(pricing.standardRegional(weightGrams)),
      remote: total(pricing.standardRemote(weightGrams)),
    },
    express: {
      local: total(pricing.expressLocal(weightGrams)),
      regional: total(pricing.expressRegional(weightGrams)),
      remote: total(pricing.expressRemote(weightGrams)),
    },
  };
}
