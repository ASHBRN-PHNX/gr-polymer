import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-image/iron-image.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';

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

      <div class="page">
        <div class="page__container">
          <h1>Login</h1>
          <iron-form>
            <form>
              <paper-input
                label="username"
                name="username"
                type="text"
              ></paper-input>
              <paper-input
                label="password"
                name="password"
                type="password"
              ></paper-input>

              <div class="button-group button-group--end">
                <div class="button-group__inner">
                  <paper-button class="button" type="submit"
                    >submit</paper-button
                  >
                </div>
              </div>
            </form>
          </iron-form>

          <div class="account">
            <a class="account__link" href="[[rootPath]]"
              ><small>forgot password?</small></a
            >
            <a class="account__link" href="[[rootPath]]"
              ><small>sign-up</small></a
            >
          </div>

          <div class="rule">
            <h5>OR</h5>
            <hr />
            <h5>Login with:</h5>
          </div>

          <div class="button-group button-group--center">
            <div class="button-group__inner">
              <paper-button class="button button--facebook"
                >facebook</paper-button
              >
              <paper-button class="button button--google">google</paper-button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static get is() {
    return 'gr-login';
  }

  static get properties() {
    return {};
  }
}

window.customElements.define(GrLogin.is, GrLogin);
