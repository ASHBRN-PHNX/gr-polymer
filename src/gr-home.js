import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

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
          fade
          sizing="cover"
          src="images/pages/home/hero-goal.jpg"
        ></iron-image>

        <div class="hero__content">
          <h1 class="hero__text">Welcome, Slayers!</h1>
        </div>
      </div>

      <div class="page">
        <div class="page__container"></div>
      </div>
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
