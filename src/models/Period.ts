export class Period {
  constructor(private seconds: number) {}

  getSecondsRemainder60(): number {
    return Math.floor(Math.abs(this.seconds) % 60);
  }

  getMinutes(): number {
    return Math.floor(Math.abs(this.seconds) / 60);
  }

  getSeconds(): number {
    return this.seconds;
  }

  toString(): string {
    const minutes = this.getMinutes();
    const minutesAsString = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsRemainder60 = this.getSecondsRemainder60();
    const secondsRemainder60AsString = secondsRemainder60 < 10 ? `0${secondsRemainder60}` : `${secondsRemainder60}`;
    const sign = this.seconds < 0 ? '+' : '';
    return `${sign}${minutesAsString}:${secondsRemainder60AsString}`;
  }

  decrease(seconds: number = 1): Period {
    return new Period(this.seconds - seconds);
  }

  isZero(): boolean {
    return this.seconds === 0;
  }

  getPercentageOf(maxPeriod: Period): number {
    const updatedMaxPeriod = this.seconds < 0 ? 200 : maxPeriod.getSeconds();
    return Math.abs(this.seconds) / updatedMaxPeriod;
  }

  clone(): Period {
    return new Period(this.seconds);
  }
}
