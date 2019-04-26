import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-image/iron-image.js';
import './shared-style.js';

class GrError extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-style">
        :host {
          display: block;
        }
      </style>

      <div class="hero">
        <iron-image
          class="hero__image"
          sizing="cover"
          src="http://via.placeholder.com/1000/9e9e9e/000000?Text=hero"
        ></iron-image>
      </div>

      <div class="page">
        <h1>Error</h1>
        <div class="page__container">
          <p>It seems you don't have access to view this content.</p>
          <p>Please login and register yourself as a guest.</p>
        </div>
      </div>
    `;
  }

  static get is() {
    return 'gr-error';
  }

  static get properties() {
    return {
      user: {
        type: Object,
        value: () => JSON.parse(localStorage.getItem('user')),
      },
    };
  }
}

window.customElements.define(GrError.is, GrError);
