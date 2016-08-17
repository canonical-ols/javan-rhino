import React, { PropTypes, Component } from 'react';
import NavLink from '../components/navlink';

export default class App extends Component {
  render() {
    return (
      <div>
        <div>
          <NavLink to="/" onlyActiveOnIndex={ true }>Home</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};
