import './timekeeper-period-dialog.scss';
import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { Period } from '../../models/Period';
import { TypedSecondsOrMinutes } from '../../models/TypedSecondsOrMinutes';

export interface ITimekeeperPeriodDialogProps {
  period: Period;
  onPeriodChange: (period: Period) => void;
}

export interface ITimekeeperPeriodDialogState {
  open: boolean;
  period: Period;
  minutesClassNames: string;
  secondsClassNames: string;
  typedSeconds?: TypedSecondsOrMinutes;
  typedMinutes?: TypedSecondsOrMinutes;
}

export default class TimekeeperPeriodDialog extends React.Component<ITimekeeperPeriodDialogProps, ITimekeeperPeriodDialogState> {
  constructor(props: ITimekeeperPeriodDialogProps) {
    super(props);
    this.state = {
      open: false,
      period: props.period.clone(),
      minutesClassNames: 'period-grid-item period-minutes-seconds pointer active',
      secondsClassNames: 'period-grid-item period-minutes-seconds pointer',
    };
  }

  public open() {
    this.setState({ open: true });
  }

  public render() {
    return (
      <Dialog
        className='timekeeper-period-dialog-container'
        open={this.state.open}
        onClose={this.handleCancelButtonClickEvent}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Period</DialogTitle>
        <DialogContent>
          <div className='period-grid'>
            <span className='period-grid-item period-grid-item-icon pointer' onClick={() => this.varyMinutes(1)}>
              <span className='iconify' data-icon='eva:arrow-ios-upward-fill' data-inline='false'></span>
            </span>
            <span className='period-grid-item'></span>
            <span className='period-grid-item period-grid-item-icon pointer' onClick={() => this.varySeconds(1)}>
              <span className='iconify' data-icon='eva:arrow-ios-upward-fill' data-inline='false'></span>
            </span>

            <span className={this.state.minutesClassNames} onClick={this.activateMinutes}>
              {this.state.period.getMinutesAsString()}
            </span>
            <span className='period-grid-item period-minutes-seconds-separator'>:</span>
            <span className={this.state.secondsClassNames} onClick={this.activateSeconds}>
              {this.state.period.getSecondsRemainder60AsString()}
            </span>

            <span className='period-grid-item period-grid-item-icon pointer' onClick={() => this.varyMinutes(-1)}>
              <span className='iconify' data-icon='eva:arrow-ios-downward-fill' data-inline='false'></span>
            </span>
            <span className='period-grid-item'></span>
            <span className='period-grid-item period-grid-item-icon pointer' onClick={() => this.varySeconds(-1)}>
              <span className='iconify' data-icon='eva:arrow-ios-downward-fill' data-inline='false'></span>
            </span>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancelButtonClickEvent} color='primary'>
            Cancel
          </Button>
          <Button onClick={this.handleOkButtonClickEvent} color='primary'>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyUpEvent);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyUpEvent);
  }

  private handleKeyUpEvent = (event) => {
    if (!this.state.open) return;
    const digitMatch = event.code.match(/Digit(\d)/);
    if (digitMatch) {
      const digit = parseInt(digitMatch[1]);
      if (this.state.minutesClassNames.includes('active')) {
        const typedMinutes = this.state.typedMinutes ? this.state.typedMinutes.append(digit) : new TypedSecondsOrMinutes(digit);
        this.setState((prevState) => ({
          period: prevState.period.setMinutes(typedMinutes.getValue()),
          typedMinutes,
        }));
      }
      if (this.state.secondsClassNames.includes('active')) {
        const typedSeconds = this.state.typedSeconds ? this.state.typedSeconds.append(digit) : new TypedSecondsOrMinutes(digit);
        this.setState((prevState) => ({
          period: prevState.period.setSecondsRemainder60(typedSeconds.getValue()),
          typedSeconds,
        }));
      }
    }
  };

  private handleCancelButtonClickEvent = () => {
    this.setState({ open: false, period: this.props.period.clone() });
  };

  private handleOkButtonClickEvent = () => {
    this.setState({ open: false });
    this.props.onPeriodChange(this.state.period);
  };

  private varyMinutes = (amount: number) => {
    this.setState((prevState) => ({
      period: prevState.period.varyMinutes(amount),
      minutesClassNames: 'period-grid-item period-minutes-seconds pointer active',
      secondsClassNames: 'period-grid-item period-minutes-seconds pointer',
    }));
  };

  private varySeconds = (amount: number) => {
    this.setState((prevState) => ({
      period: prevState.period.varySeconds(amount),
      minutesClassNames: 'period-grid-item period-minutes-seconds pointer',
      secondsClassNames: 'period-grid-item period-minutes-seconds pointer active',
    }));
  };

  private activateMinutes = () => {
    this.setState({
      minutesClassNames: 'period-grid-item period-minutes-seconds pointer active',
      secondsClassNames: 'period-grid-item period-minutes-seconds pointer',
    });
  };

  private activateSeconds = () => {
    this.setState({
      minutesClassNames: 'period-grid-item period-minutes-seconds pointer',
      secondsClassNames: 'period-grid-item period-minutes-seconds pointer active',
    });
  };
}
