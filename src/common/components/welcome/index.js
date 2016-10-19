import React from 'react';

import styles from './welcome.css';

export default function Welcome()  {
  return (
    <div className={ `${styles.welcome} ${styles.box}` }>
      <h3>Buy snaps on the command line with my.ubuntu.com!</h3>
      <p>Setting up your my.ubuntu.com account is easy, all you need to do is:</p>
      <ul>
        <li>Log in using Ubuntu Single Sign On.</li>
        <li>Provide us your payment details.</li>
      </ul>
      <p>Once complete, simply return to the command line and complete your purchase.</p>
    </div>
  );
}
