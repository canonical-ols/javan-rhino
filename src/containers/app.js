import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import Header from '../components/header';
import Footer from '../components/footer';
import Notification from '../components/notification';
import Oyez from '../components/oyez';
import styles from './app.css';

export class App extends Component {
  render() {
    const { identity, oyez, notifications } = this.props;
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
        <Header identity={ identity }/>
        { oyez && oyez.map((oy, i) => {
          return <Oyez key={i} { ...oy}/>;
        })}
        { this.props.children }
        {notifications.notification &&
          <div className={ styles.staticNotification }>
            <Notification { ...notifications.notification } />
          </div>
        }
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
