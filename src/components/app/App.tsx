import './app.scss';
import * as React from 'react';
import Navbar from '../navbar/Navbar';
import Timekeeper from '../timekeeper/Timekeeper';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

export interface IAppProps {}

export interface IAppState {}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {};
  }

  private theme = createMuiTheme({
    typography: {
      // Tell Material-UI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });

  public render() {
    return (
      <ThemeProvider theme={this.theme}>
        <div className='app-container'>
          <Navbar></Navbar>
          <Timekeeper></Timekeeper>
        </div>
      </ThemeProvider>
    );
  }
}
