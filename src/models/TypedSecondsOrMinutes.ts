export class TypedSecondsOrMinutes {
  private typedAt: Date;
  public constructor(private value: number) {
    this.typedAt = new Date();
  }

  public append(digit: number): TypedSecondsOrMinutes {
    if (new Date().getTime() - this.typedAt.getTime() > 1000) {
      return new TypedSecondsOrMinutes(digit);
    }
    if (this.value > 5) {
      return new TypedSecondsOrMinutes(digit);
    }
    return new TypedSecondsOrMinutes(parseInt(`${this.value}${digit}`));
  }

  public getValue(): number {
    return this.value;
  }
}
