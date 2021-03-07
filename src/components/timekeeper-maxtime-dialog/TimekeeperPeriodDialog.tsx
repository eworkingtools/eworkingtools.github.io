import './timekeeper-period-dialog.scss';
import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { Period } from '../../models/Period';

export interface ITimekeeperPeriodDialogProps {
  maxPeriod: Period;
}

export interface ITimekeeperPeriodDialogState {
  open: boolean;
  period: Period;
}

export default class TimekeeperPeriodDialog extends React.Component<ITimekeeperPeriodDialogProps, ITimekeeperPeriodDialogState> {
  constructor(props: ITimekeeperPeriodDialogProps) {
    super(props);
    this.state = {
      open: false,
      period: props.maxPeriod.clone(),
    };
  }

  public open() {
    this.setState({ open: true });
  }

  private handleCloseDialogEvent = () => {
    this.setState({ open: false });
  };

  public render() {
    return (
      <div className='timekeeper-period-dialog-container'>
        <Dialog
          open={this.state.open}
          onClose={this.handleCloseDialogEvent}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>TimeKeeper Period</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDialogEvent} color='primary'>
              Disagree
            </Button>
            <Button onClick={this.handleCloseDialogEvent} color='primary' autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
