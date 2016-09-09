import React, { Component, PropTypes } from 'react';

import style from './root.css';

export default class User extends Component {
  render() {
    const { user } = this.props;
    let link;
    if (user.isAuthenticated) {
      link = <div className={ style.link }><span className={ style.username }>{ user.name }</span> <a href="/logout">Logout</a></div>;
    } else {
      link = <a className={ style.link } href="/login/authenticate">Login</a>;
    }

    return link;
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired
};
