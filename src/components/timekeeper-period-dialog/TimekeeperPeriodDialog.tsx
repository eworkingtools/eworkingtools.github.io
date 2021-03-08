import './timekeeper-period-dialog.scss';
import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { Period } from '../../models/Period';

export interface ITimekeeperPeriodDialogProps {
  period: Period;
  onPeriodChange: (period: Period) => void;
}

export interface ITimekeeperPeriodDialogState {
  open: boolean;
  period: Period;
  periodMinutesClassNames: string;
  periodSecondsClassNames: string;
}

export default class TimekeeperPeriodDialog extends React.Component<ITimekeeperPeriodDialogProps, ITimekeeperPeriodDialogState> {
  constructor(props: ITimekeeperPeriodDialogProps) {
    super(props);
    this.state = {
      open: false,
      period: props.period.clone(),
      periodMinutesClassNames: 'period-grid-item period-minutes-seconds pointer active',
      periodSecondsClassNames: 'period-grid-item period-minutes-seconds pointer',
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
            <span className='period-grid-item pointer' onClick={() => this.varyMinutes(1)}>
              <span className='iconify' data-icon='eva:arrow-ios-upward-fill' data-inline='false'></span>
            </span>
            <span className='period-grid-item'></span>
            <span className='period-grid-item pointer' onClick={() => this.varySeconds(1)}>
              <span className='iconify' data-icon='eva:arrow-ios-upward-fill' data-inline='false'></span>
            </span>

            <span className={this.state.periodMinutesClassNames} onClick={this.activateMinutes}>
              {this.state.period.getMinutesAsString()}
            </span>
            <span className='period-grid-item period-minutes-seconds-separator'>:</span>
            <span className={this.state.periodSecondsClassNames} onClick={this.activateSeconds}>
              {this.state.period.getSecondsRemainder60AsString()}
            </span>

            <span className='period-grid-item pointer' onClick={() => this.varyMinutes(-1)}>
              <span className='iconify' data-icon='eva:arrow-ios-downward-fill' data-inline='false'></span>
            </span>
            <span className='period-grid-item'></span>
            <span className='period-grid-item pointer' onClick={() => this.varySeconds(-1)}>
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

  private handleCancelButtonClickEvent = () => {
    this.setState({ open: false });
  };

  private handleOkButtonClickEvent = () => {
    this.setState({ open: false });
    this.props.onPeriodChange(this.state.period);
  };

  private varyMinutes = (amount: number) => {
    this.setState((prevState) => ({
      period: prevState.period.varyMinutes(amount),
      periodMinutesClassNames: 'period-grid-item period-minutes-seconds pointer active',
      periodSecondsClassNames: 'period-grid-item period-minutes-seconds pointer',
    }));
  };

  private varySeconds = (amount: number) => {
    this.setState((prevState) => ({
      period: prevState.period.varySeconds(amount),
      periodMinutesClassNames: 'period-grid-item period-minutes-seconds pointer',
      periodSecondsClassNames: 'period-grid-item period-minutes-seconds pointer active',
    }));
  };

  private activateMinutes = () => {
    this.setState({
      periodMinutesClassNames: 'period-grid-item period-minutes-seconds pointer active',
      periodSecondsClassNames: 'period-grid-item period-minutes-seconds pointer',
    });
  };

  private activateSeconds = () => {
    this.setState({
      periodMinutesClassNames: 'period-grid-item period-minutes-seconds pointer',
      periodSecondsClassNames: 'period-grid-item period-minutes-seconds pointer active',
    });
  };
}
