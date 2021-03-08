import './timekeeper.scss';
import * as React from 'react';
import { Period } from '../../models/Period';
import TimekeeperPeriodDialog from '../timekeeper-period-dialog/TimekeeperPeriodDialog';

export interface ITimekeeperProps {}

export interface ITimekeeperState {
  maxPeriod: Period;
  periodLeft: Period;
  remainingCircleDasharray: string;
  circleClassName: string;
  status: ETimekeeperStatus;
  interval: NodeJS.Timeout;
}

export enum ETimekeeperStatus {
  RUNNING,
  PAUSED,
}

const CIRCLE_FULL_DASH_ARRAY = 283;

const INITIAL_STATE: ITimekeeperState = {
  maxPeriod: new Period(120),
  periodLeft: new Period(120),
  circleClassName: 'timekeeper-circle',
  remainingCircleDasharray: `${CIRCLE_FULL_DASH_ARRAY} ${CIRCLE_FULL_DASH_ARRAY}`,
  status: ETimekeeperStatus.PAUSED,
  interval: null,
};

export default class Timekeeper extends React.Component<ITimekeeperProps, ITimekeeperState> {
  private maxPeriodDialog: TimekeeperPeriodDialog;

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
            <div className={this.state.circleClassName} onClick={this.openMaxPeriodDialog}>
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
              <span className='timekeeper-circle-label'>{this.state.periodLeft.toString()}</span>
            </div>
            <div className='timekeeper-buttons'>
              <span className={this.state.status == ETimekeeperStatus.RUNNING ? 'hide' : ''} onClick={() => this.continueTimer()}>
                <span className='iconify pointer' data-icon='fluent:play-48-regular' data-inline='false'></span>
              </span>
              <span className={this.state.status == ETimekeeperStatus.PAUSED ? 'hide' : ''} onClick={() => this.pauseTimer()}>
                <span className='iconify pointer' data-icon='akar-icons:pause' data-inline='false'></span>
              </span>
              <span onClick={() => this.resetTimer()}>
                <span className='iconify pointer reset-button' data-icon='system-uicons:reset' data-inline='false'></span>
              </span>
            </div>
          </div>
        </div>
        <TimekeeperPeriodDialog
          ref={(ref) => (this.maxPeriodDialog = ref)}
          period={this.state.maxPeriod}
          onPeriodChange={this.handlePeriodChange}
        ></TimekeeperPeriodDialog>
      </div>
    );
  }

  private handlePeriodChange = (period: Period) => {
    this.setState({ ...INITIAL_STATE, maxPeriod: period, periodLeft: period });
  };

  private openMaxPeriodDialog = () => {
    this.maxPeriodDialog.open();
  };

  private continueTimer() {
    const that = this;
    const interval = setInterval(() => {
      that.decreasePeriodLeft();
      that.updateCircleStrokeDasharray();
      if (that.state.periodLeft.isZero()) {
        this.setState({ circleClassName: 'timekeeper-circle timekeeper-circle-with-time-left-equals-to-zero' });
      }
    }, 1000);
    this.setState({ status: ETimekeeperStatus.RUNNING, interval });
  }

  private decreasePeriodLeft() {
    this.setState((previousState) => ({
      periodLeft: previousState.periodLeft.varySeconds(-1),
    }));
  }

  pauseTimer() {
    this.setState({ status: ETimekeeperStatus.PAUSED });
    clearInterval(this.state.interval);
  }

  resetTimer() {
    clearInterval(this.state.interval);
    this.setState({ periodLeft: this.state.maxPeriod.clone(), circleClassName: 'timekeeper-circle' });
    this.continueTimer();
  }

  private updateCircleStrokeDasharray() {
    const periodLeftPercentage = this.state.periodLeft.getPercentageOf(this.state.maxPeriod);
    const remainingCircleDasharray = `${(periodLeftPercentage * CIRCLE_FULL_DASH_ARRAY).toFixed(0)} ${CIRCLE_FULL_DASH_ARRAY}`;
    this.setState({ remainingCircleDasharray });
  }
}
