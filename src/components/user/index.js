import React, { Component, PropTypes } from 'react';

import style from './user.css';

export default class User extends Component {
  renderAuthenticatedLink(user) {
    let link;

    if (user.isAuthenticated) {
      link = <div className={ style.link }>
        <span className={ style.username }>{ user.name }</span>{ ' ' }
        <a href="/logout">Logout</a>
      </div>;
    } else {
      link = <a className={ style.link } href="/login/authenticate">Login</a>;
    }

    return link;
  }

  render() {
    const { user } = this.props;

    return this.renderAuthenticatedLink(user);
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired
};