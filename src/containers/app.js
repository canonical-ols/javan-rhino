import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import Header from '../components/header';
import Footer from '../components/footer';

class App extends Component {
  render() {
    const { authenticatedUser } = this.props;
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
        <Header user={ authenticatedUser }/>
        { this.props.children }
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  authenticatedUser: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const {
    authenticatedUser
  } = state;

  return {
    authenticatedUser
  };
}

export default connect(mapStateToProps)(App);
