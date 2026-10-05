type Application = { id: string; name: string; score: number; email: string };
type Notification = { recipient: string; subject: string; body: string };

export class AdmissionOffice {
  private readonly students = new Map<string, Application>();
  private readonly messages: Notification[] = [];

  qualifies(application: Application): boolean {
    return application.score >= 70;
  }

  scholarshipPercent(application: Application): number {
    return application.score >= 90 ? 30 : 0;
  }

  private save(application: Application): void {
    this.students.set(application.id, { ...application });
  }

  find(id: string): Application | undefined {
    const application = this.students.get(id);
    return application ? { ...application } : undefined;
  }

  private sendConfirmation(application: Application): void {
    this.messages.push({
      recipient: application.email,
      subject: "Enrollment confirmed",
      body: application.name + ", scholarship: " + this.scholarshipPercent(application) + "%",
    });
  }

  renderStudentCard(id: string): string {
    const student = this.find(id);
    if (!student) throw new Error("Student not found");
    return student.id + " | " + student.name + " | SCHOLARSHIP " + this.scholarshipPercent(student) + "%";
  }

  enroll(application: Application): boolean {
    if (!this.qualifies(application)) return false;
    this.save(application);
    this.sendConfirmation(application);
    return true;
  }

  notifications(): Notification[] {
    return this.messages.map((message) => ({ ...message }));
  }
}

export class StudentAccount {
  private unpaidCents = 0;
  private failedSignIns = 0;
  private blockedUntil = 0;

  constructor(readonly studentId: string, private accessKey: string) {}

  chargeTuition(monthlyCents: number, scholarshipPercent: number): number {
    if (!Number.isInteger(monthlyCents) || monthlyCents < 0 ||
        !Number.isInteger(scholarshipPercent) || scholarshipPercent < 0 || scholarshipPercent > 100) {
      throw new Error("Invalid tuition");
    }
    this.unpaidCents += Math.round(monthlyCents * (100 - scholarshipPercent) / 100);
    return this.unpaidCents;
  }

  pay(amountCents: number): number {
    if (!Number.isInteger(amountCents) || amountCents <= 0 || amountCents > this.unpaidCents) {
      throw new Error("Invalid payment");
    }
    this.unpaidCents -= amountCents;
    return this.unpaidCents;
  }

  signIn(accessKey: string, nowMillis: number): boolean {
    if (nowMillis < this.blockedUntil) return false;
    if (accessKey !== this.accessKey) {
      this.failedSignIns += 1;
      if (this.failedSignIns >= 3) this.blockedUntil = nowMillis + 60_000;
      return false;
    }
    this.failedSignIns = 0;
    return true;
  }

  changeAccessKey(currentKey: string, newKey: string): void {
    if (currentKey !== this.accessKey || newKey.length < 8) throw new Error("Invalid access key");
    this.accessKey = newKey;
  }
}

export function processApplication(office: AdmissionOffice, application: Application) {
  const enrolled = office.enroll(application);
  return { enrolled, studentCard: enrolled ? office.renderStudentCard(application.id) : undefined };
}
