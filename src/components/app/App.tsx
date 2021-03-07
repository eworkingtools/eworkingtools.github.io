import './app.scss';
import * as React from 'react';
import Navbar from '../navbar/Navbar';
import Timekeeper from '../timekeeper/Timekeeper';

export interface IAppProps {}

export interface IAppState {}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <div className='app-container'>
        <Navbar></Navbar>
        <Timekeeper></Timekeeper>
      </div>
    );
  }
}
