import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import Header from '../components/header';
import Footer from '../components/footer';
import Notification from '../components/notification';
import styles from './app.css';

export class App extends Component {
  render() {
    const { identity, notifications } = this.props;
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
          script={[
            { src: 'https://js.stripe.com/v2/' }
          ]}
        />
        {notifications.notification &&
          <div className={ styles.notification }>
            <Notification { ...notifications.notification } />
          </div>
        }
        <Header identity={ identity }/>
        { this.props.children }
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  identity: PropTypes.object.isRequired,
  notifications: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const {
    identity,
    notifications
  } = state;

  return {
    identity,
    notifications
  };
}

export default connect(mapStateToProps)(App);
