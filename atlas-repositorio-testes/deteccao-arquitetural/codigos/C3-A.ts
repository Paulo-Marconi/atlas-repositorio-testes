type WalletEntry = { kind: "deposit" | "withdrawal"; amountCents: number };

export class Wallet {
  private readonly entries: WalletEntry[] = [];
  private holdReason?: string;
  public spendingBlocked = false;

  constructor(readonly ownerId: string, public balanceCents = 0) {
    if (!Number.isInteger(balanceCents) || balanceCents < 0) throw new Error("Invalid opening balance");
  }

  deposit(amountCents: number): void {
    if (!Number.isInteger(amountCents) || amountCents <= 0) throw new Error("Invalid deposit");
    this.balanceCents += amountCents;
    this.entries.push({ kind: "deposit", amountCents });
  }

  withdraw(amountCents: number): void {
    if (this.spendingBlocked) throw new Error("Wallet is on hold");
    if (!Number.isInteger(amountCents) || amountCents <= 0 || amountCents > this.balanceCents) {
      throw new Error("Invalid withdrawal");
    }
    this.balanceCents -= amountCents;
    this.entries.push({ kind: "withdrawal", amountCents });
  }

  history(): WalletEntry[] { return this.entries; }

  blockSpending(reason: string): void {
    if (!reason.trim()) throw new Error("Hold reason is required");
    this.holdReason = reason;
    this.spendingBlocked = true;
  }

  releaseSpending(resolution: string): void {
    if (!resolution.trim()) throw new Error("Hold resolution is required");
    this.holdReason = undefined;
    this.spendingBlocked = false;
  }

  currentHold(): string | undefined { return this.holdReason; }
}

export function applyAdjustment(wallet: Wallet, amountCents: number): void {
  wallet.balanceCents += amountCents;
}

export function processWalletAdjustment(wallet: Wallet, amountCents: number) {
  applyAdjustment(wallet, amountCents);
  return { ownerId: wallet.ownerId, balanceCents: wallet.balanceCents, history: wallet.history() };
}
