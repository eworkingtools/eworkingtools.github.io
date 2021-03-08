export class Period {
  constructor(private seconds: number) {}

  getSecondsRemainder60(): number {
    return Math.floor(Math.abs(this.seconds) % 60);
  }

  setSecondsRemainder60(seconds: number): Period {
    return new Period(this.getMinutes() * 60 + seconds);
  }

  getSecondsRemainder60AsString(): string {
    const seconds = this.getSecondsRemainder60();
    return seconds < 10 ? `0${seconds}` : `${seconds}`;
  }

  getMinutes(): number {
    return Math.floor(Math.abs(this.seconds) / 60);
  }

  setMinutes(minutes: number): Period {
    return new Period(minutes * 60 + this.getSecondsRemainder60());
  }

  getMinutesAsString(): string {
    const minutes = this.getMinutes();
    return minutes < 10 ? `0${minutes}` : `${minutes}`;
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

  varySeconds(amount): Period {
    return new Period(this.seconds + amount);
  }

  varyMinutes(amount): Period {
    return new Period(this.seconds + amount * 60);
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
