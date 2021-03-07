import './timekeeper.scss';
import * as React from 'react';

export interface ITimekeeperProps {}

export interface ITimekeeperState {
  maxTime: number;
  timeLeft: number;
  timeLeftAsText: string;
  remainingCircleDasharray: string;
  circleClassName: string;
  status: ETimekeeperStatus;
  interval: NodeJS.Timeout;
}

export enum ETimekeeperStatus {
  RUNNING,
  PAUSED,
}

const FULL_DASH_ARRAY = 283;

const INITIAL_STATE: ITimekeeperState = {
  maxTime: 120,
  timeLeft: 120,
  timeLeftAsText: '2:00',
  circleClassName: 'timekeeper-circle',
  remainingCircleDasharray: `${FULL_DASH_ARRAY} ${FULL_DASH_ARRAY}`,
  status: ETimekeeperStatus.PAUSED,
  interval: null,
};

export default class Timekeeper extends React.Component<ITimekeeperProps, ITimekeeperState> {
  constructor(props: ITimekeeperProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  public render() {
    return (
      <div className='timekeeper-container'>
        <div className='timekeeper-background'>
          <div className='timekeeper-forehand'>
            <h1 className='timekeeper-header'>Time Keeper</h1>
            <div className={this.state.circleClassName}>
              <svg className='timekeeper-svg' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
                <g className='timekeeper-svg-circle'>
                  <circle className='timekeeper-svg-circle-full-path' cx='50' cy='50' r='45'></circle>
                  <path
                    className='timekeeper-svg-circle-remaining-path'
                    stroke-dasharray={this.state.remainingCircleDasharray}
                    d='
                        M 50, 50
                        m -45, 0
                        a 45,45 0 1,0 90,0
                        a 45,45 0 1,0 -90,0
                      '
                  ></path>
                </g>
              </svg>
              <span className='timekeeper-circle-label'>{this.state.timeLeftAsText}</span>
            </div>
            <div className='timekeeper-buttons'>
              <span className={this.state.status == ETimekeeperStatus.RUNNING ? 'hide' : ''} onClick={() => this.continueTimer()}>
                <span className='iconify pointer' data-icon='fluent:play-48-regular' data-inline='false'></span>
              </span>
              <span className={this.state.status == ETimekeeperStatus.PAUSED ? 'hide' : ''} onClick={() => this.pauseTimer()}>
                <span className='iconify pointer' data-icon='akar-icons:pause' data-inline='false'></span>
              </span>
              <span onClick={() => this.resetTimer()}>
                <span className='iconify pointer reset-button' data-icon='grommet-icons:power-reset' data-inline='false'></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.formatTimeLeft();
  }

  continueTimer() {
    const that = this;
    const interval = setInterval(() => {
      this.decreaseTimeLeft(that);
      that.formatTimeLeft();
      that.updateCircleStrokeDasharray();
      if (that.state.timeLeft == 0) {
        this.setState({ circleClassName: 'timekeeper-circle timekeeper-circle-with-time-left-equals-to-zero' });
      }
    }, 1000);
    this.setState({ status: ETimekeeperStatus.RUNNING, interval });
  }

  private decreaseTimeLeft(that: this) {
    that.setState((previousState) => ({
      timeLeft: previousState.timeLeft - 1,
    }));
  }

  pauseTimer() {
    this.setState({ status: ETimekeeperStatus.PAUSED });
    clearInterval(this.state.interval);
  }

  resetTimer() {
    clearInterval(this.state.interval);
    this.setState({ timeLeft: this.state.maxTime, circleClassName: 'timekeeper-circle' });
    this.continueTimer();
  }

  private formatTimeLeft() {
    const minutes = Math.floor(Math.abs(this.state.timeLeft) / 60);
    const seconds = Math.floor(Math.abs(this.state.timeLeft) % 60);
    const secondsAsString = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const sign = this.state.timeLeft < 0 ? '+' : '';
    this.setState({ timeLeftAsText: `${sign}${minutes}:${secondsAsString}` });
  }

  private updateCircleStrokeDasharray() {
    const remainingCircleDasharray = `${(this.calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} ${FULL_DASH_ARRAY}`;
    this.setState({ remainingCircleDasharray });
  }

  private calculateTimeFraction(): number {
    if (this.state.timeLeft === 0) return 0;
    const maxTime = this.state.timeLeft < 0 ? 200 : this.state.maxTime;
    const rawTimeFraction = Math.abs(this.state.timeLeft) / maxTime;
    const res = rawTimeFraction - (1 / maxTime) * (1 - rawTimeFraction);
    return res;
  }
}
