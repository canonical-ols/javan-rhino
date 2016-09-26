import React from 'react';

import styles from './customer-success.css';

export default function CustomerSuccess() {
  return (
    <div className={ styles.customerSuccess }>
      <h3>Payment details successfully saved, thank you!</h3>
      <p>Proceed with your purchases in command line using <code className={ styles.code }>snap buy</code> command.</p>
    </div>
  );
}
