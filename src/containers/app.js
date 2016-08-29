import React, { PropTypes, Component } from 'react';
import NavLink from '../components/navlink/navlink';
import Helmet from 'react-helmet';

export default class App extends Component {
  render() {
    // FIXME sstewart 17-Aug-16 move some of this to config
    return (
      <div>
        <Helmet
          htmlAttributes={{ 'lang': 'en' }}
          title='buy [snap-name]'
          titleTemplate='my.ubuntu.com - %s'
          meta={[
            { 'name': 'description', 'content': 'my.ubuntu.com payments ui' },
          ]}
        />
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
