import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import Header from '../components/header';
import Footer from '../components/footer';
import * as authActions from '../redux/auth';

class App extends Component {
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
        <Header onLoginClick={ this.props.login } loggedIn={ this.props.loggedIn } />
        { this.props.children }
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  login: PropTypes.func,
  loggedIn: PropTypes.bool
};

const mapStateToProps = state => ({ loggedIn: state.auth.loggedIn });

export default connect(mapStateToProps, authActions)(App);
