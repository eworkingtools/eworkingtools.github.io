import './timekeeper.scss';
import * as React from 'react';

export interface ITimekeeperProps {}

export interface ITimekeeperState {
  state: ETimekeeperState;
}

export enum ETimekeeperState {
  RUNNING,
  PAUSED,
}

export default class Timekeeper extends React.Component<ITimekeeperProps, ITimekeeperState> {
  private fullDashArray = 283;
  private maxTime = 60;
  private timeLeft: number = this.maxTime;
  private timeLeftHtmlElement: HTMLElement;
  private timekeeperCircleRemainingPath: SVGPathElement;
  private timekeeperInterval: NodeJS.Timeout;

  constructor(props: ITimekeeperProps) {
    super(props);

    this.state = {
      state: ETimekeeperState.PAUSED,
    };
  }

  public render() {
    return (
      <div className='timekeeper-container'>
        <svg className='timekeeper-svg' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
          <g className='timekeeper-circle'>
            <circle className='timekeeper-circle-full-path' cx='50' cy='50' r='45'></circle>
            <path
              ref={(ref) => (this.timekeeperCircleRemainingPath = ref)}
              className='timekeeper-circle-remaining-path'
              d='
                  M 50, 50
                  m -45, 0
                  a 45,45 0 1,0 90,0
                  a 45,45 0 1,0 -90,0
                '
            ></path>
          </g>
        </svg>
        <span ref={(ref) => (this.timeLeftHtmlElement = ref)} className='timekeeper-label'></span>
        <div className='timekeeper-buttons'>
          <span className={this.state.state == ETimekeeperState.RUNNING ? 'hide' : ''} onClick={() => this.continueTimer()}>
            <span className='iconify pointer' data-icon='fluent:play-48-regular' data-inline='false'></span>
          </span>
          <span className={this.state.state == ETimekeeperState.PAUSED ? 'hide' : ''} onClick={() => this.pauseTimer()}>
            <span className='iconify pointer' data-icon='akar-icons:pause' data-inline='false'></span>
          </span>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.formatTimeLeft();
  }

  continueTimer() {
    const that = this;
    this.setState({ ...this.state, state: ETimekeeperState.RUNNING });
    this.timekeeperInterval = setInterval(() => {
      that.timeLeft -= 0.5;
      that.formatTimeLeft();
      that.updateCircleStrokeDasharray();
      if (that.timeLeft == 0) {
        clearInterval(that.timekeeperInterval);
        this.setState({ ...this.state, state: ETimekeeperState.PAUSED });
        that.timeLeft = that.maxTime;
      }
    }, 500);
  }

  pauseTimer() {
    this.setState({ ...this.state, state: ETimekeeperState.PAUSED });
    clearInterval(this.timekeeperInterval);
  }

  private formatTimeLeft() {
    const minutes = Math.floor(this.timeLeft / 60);
    let seconds = Math.floor(this.timeLeft % 60);
    let secondsAsString = seconds < 10 ? `0${seconds}` : `${seconds}`;
    this.timeLeftHtmlElement.innerHTML = `${minutes}:${secondsAsString}`;
  }

  private updateCircleStrokeDasharray() {
    const circleDasharray = `${(this.calculateTimeFraction() * this.fullDashArray).toFixed(0)} 283`;
    this.timekeeperCircleRemainingPath.setAttribute('stroke-dasharray', circleDasharray);
  }

  private calculateTimeFraction(): number {
    const rawTimeFraction = this.timeLeft / this.maxTime;
    return rawTimeFraction - (1 / this.maxTime) * (1 - rawTimeFraction);
  }
}
