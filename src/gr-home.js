import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-image/iron-image.js';

import './shared-style.js';

class GrHome extends PolymerElement {
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
        <h1>Welcome to Guest Registration</h1>
        <div class="page__container"></div>
      </div>

      <iron-ajax
        auto
        content-type="application/json"
        handle-as="json"
        id="ajax"
        url="http://127.0.0.1:3000/api/v1/example"
      ></iron-ajax>
    `;
  }

  static get is() {
    return 'gr-home';
  }

  static get properties() {
    return {};
  }
}

window.customElements.define(GrHome.is, GrHome);
