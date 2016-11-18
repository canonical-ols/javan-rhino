import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import Header from '../components/header';
import Footer from '../components/footer';
import Notification from '../components/notification';
import styles from './app.css';

export class App extends Component {
  render() {
    const { identity, oyez, notifications } = this.props;

    if (notifications.notification) {
      setTimeout(() => {
        window.scrollTo(0,0);
      }, 0);
    }

    // FIXME sstewart 17-Aug-16 move some of this to config
    return (
      <div>
        <Helmet
          htmlAttributes={{ 'lang': 'en' }}
          titleTemplate='my.ubuntu.com - %s'
          defaultTitle='my.ubuntu.com'
          meta={[
            { 'name': 'description', 'content': 'my.ubuntu.com payments ui' },
          ]}
        />
        <Header identity={ identity }/>
        <div className={ styles.staticNotifications }>
          { oyez && oyez.map((oy, i) => {
            return <Notification key={i} { ...oy}/>;
          })}
          {notifications.notification &&
            <Notification { ...notifications.notification } />
          }
        </div>
        { this.props.children }
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  identity: PropTypes.object.isRequired,
  notifications: PropTypes.object.isRequired,
  oyez: PropTypes.array
};

function mapStateToProps(state) {
  const {
    identity,
    oyez,
    notifications
  } = state;

  return {
    identity,
    oyez,
    notifications
  };
}

export default connect(mapStateToProps)(App);
