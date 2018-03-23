import React from 'react';

import styles from './welcome.css';

export default function Welcome()  {
  return (
    <div className={ `${styles.welcome} ${styles.box}` }>
      <h3>my.ubuntu.com allows you to set up a payment method to purchase snaps.</h3>
      <p>Setting up your my.ubuntu.com account is easy, all you need to do is:</p>
      <ul>
        <li>Log in using Ubuntu Single Sign On.</li>
        <li>Provide us your payment details.</li>
      </ul>
      <p>Once complete, simply use your software installer or the <i>snap</i> command-line utility to complete your purchase.</p>
    </div>
  );
}
