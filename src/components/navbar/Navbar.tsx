import './navbar.scss';
import * as React from 'react';

export interface INavbarProps {}

export interface INavbarState {}

export default class Navbar extends React.Component<INavbarProps, INavbarState> {
  constructor(props: INavbarProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <div className='navbar-container'>
        <img className='website-logo' src='/logo.png'></img>
        <span className='website-name'>E-Working Tools</span>
        <span className='nav-item'>TimeKeeper</span>
      </div>
    );
  }
}
