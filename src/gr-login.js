import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/iron-image/iron-image.js';

import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';

import './shared-style.js';

class GrLogin extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-style">
        :host {
          display: block;
        }

        .page {
          margin: 10% 0;
        }

        .page__container {
          margin: 0 auto;
          width: 400px;
        }

        .account {
          text-align: center;
        }

        .rule {
          text-align: center;
        }
      </style>

      <div hidden$="[[authenticated]]">
        <section class="page">
          <div class="page__container">
            <h1>Login</h1>

            <iron-form
              content-type="application/json"
              handle-as="json"
              id="form"
              on-iron-form-error="_onIronFormError"
              on-iron-form-response="_onIronFormResponse"
              with-credentials
            >
              <form
                action$="[[config.origin]][[config.api]]login"
                method="POST"
              >
                <paper-input
                  label="username"
                  name="username"
                  required
                  type="text"
                ></paper-input>
                <paper-input
                  label="password"
                  name="password"
                  required
                  type="password"
                ></paper-input>

                <div class="button-group button-group--center">
                  <paper-button class="button" on-click="_submit" raised
                    >submit</paper-button
                  >
                </div>
              </form>
            </iron-form>

            <div class="account">
              <a class="account__link" href$="[[rootPath]]"
                ><small>forgot password?</small></a
              >
              <a class="account__link" href$="[[rootPath]]"
                ><small>sign-up</small></a
              >
            </div>

            <div class="rule">
              <h5>OR</h5>
              <hr />
              <h5>Login with:</h5>
            </div>

            <div class="button-group button-group--center">
              <paper-button class="button button--facebook" raised
                >facebook</paper-button
              >
              <paper-button class="button button--google" raised
                >google</paper-button
              >
            </div>
          </div>
        </section>
      </div>

      <div hidden$="[[!authenticated]]">
        <section class="page">
          <div class="button-group button-group--center">
            <paper-button class="button" on-click="_logout" raised
              >Logout</paper-button
            >
          </div>
        </section>
      </div>

      <iron-ajax
        content-type="application/json"
        id="logout"
        method="POST"
        url="[[config.origin]][[config.api]]logout"
        with-credentials
      ></iron-ajax>
    `;
  }

  static get properties() {
    return {
      authenticated: {
        type: Boolean,
        value: () => GrAppGlobals.authenticated,
      },
    };
  }

  static get is() {
    return 'gr-login';
  }

  /**
   * Logout
   */
  _logout() {
    this.$.logout.generateRequest();

    this.authenticated = false;
  }

  /**
   * On Iron Form Error
   * @param {object} event
   */
  _onIronFormError(event) {
    console.error(event.detail.request.response.message);
  }

  /**
   * On Iron Form Response
   * @param {object} event
   */
  _onIronFormResponse(event) {
    this._setAuthentication(event.detail.response.token);
  }

  /**
   * Set authentication
   * @param {string} token
   */
  _setAuthentication(token) {
    localStorage.setItem('token', token);

    this.authenticated = true;
  }

  /**
   * Submit
   */
  _submit() {
    this.$.form.submit();
  }
}

window.customElements.define(GrLogin.is, GrLogin);
