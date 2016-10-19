import React, { Component } from 'react';

import styles from './terms.css';

export default class Terms extends Component {
  render() {
    return (
      <div className={ styles.terms }>
        <h2>Terms of Service</h2>

        {/* FIXME: remove this warning when final copy is added here */}
        <h3 style={{ color: 'red' }}>{'[WORK IN PROGRESS] it\'s just a dummy text to test styles, to be updated with real TOS'}</h3>

        <h3>1. Introduction</h3>

        <p><strong>
          These Terms of Service cover the provision of Snappy Ubuntu Apps by Canonical Group Limited ("Canonical", "us", "our" or "we") to you ("you" or "your") subject to and in accordance with these Terms of Service (the “Services”).
        </strong></p>

        <p>
          Please read these Terms of Service carefully before you use the Services. ...
        </p>

        <p>...</p>

        <h3>4. End of Service</h3>

        <p>We look forward to providing you with the Service for so long as you wish to receive it. However, there are some circumstances under which the Service may be suspended or terminated:</p>

        <ul>
          <li>We cease to make the Service (or any part thereof) available</li>
          <li>By us at any time as described in Section 3 above</li>
          <li>You do not pay the Fees</li>
        </ul>

        <p>We may also cease to offer the services for any other reason, in which case we will provide you with notice on your account page.</p>

        <p>You may cancel your use of the Services by cancelling your account in accordance with section 3. Cancellation of your account will have the effect of cancelling your subscription to the Software.</p>


        <h3>7. Intellectual property and content</h3>
        <h4>Intellectual property</h4>
        <p>You have a non-exclusive, non-transferable (to the extent permitted by law) right to view, access and use the Services for such time as it is made available by us strictly in accordance with these Terms of Service.</p>

        <p>You will not acquire any rights to the Service (or the intellectual property rights contained therein) from your use of the Service, other than as set out in these Terms of Service or the Software Terms.</p>

        <h4>Content</h4>
        <p>You are responsible for all Software, content and applications that you create or use through your account. All Software, content and applications provided by you or a third party are accessed at your sole discretion and risk.</p>

        <p>...</p>

        <h3>9. General</h3>
        <p>These Terms of Service are governed by the laws of England and any dispute will be heard by the courts in England.</p>

        <p>Failure by Canonical to enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision. If any part of these Terms of Service is held invalid or unenforceable, that part will be construed to reflect the parties original intent, and the remaining portions will remain in full force and effect. The terms of these Terms of Service do not affect your statutory rights.</p>

        <p>Any notices should be sent by registered post to:</p>

        <p><strong>Canonical Group Limited,<br/>
          5th Floor, Blue Fin Building,<br/>
          110 Southwark Street,<br/>
          London, SE1 0SU.<br/>
          <br/>
          Version: 13th September 2016
        </strong></p>
      </div>
    );
  }
}
