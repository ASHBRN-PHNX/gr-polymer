import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-image/iron-image.js';
import './shared-style.js';

class GrEvent extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-style">
        :host {
          display: block;
        }

        .hero {
          height: 300px;
          position: relative;
          width: 100%;
        }

        .hero__image {
          height: 100%;
          width: 100%;
        }

        .home {
          padding: 16px;
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
        <h1>Event</h1>
        <div class="page__container"></div>
      </div>
    `;
  }

  static get is() {
    return 'gr-event';
  }

  static get properties() {
    return {};
  }
}

window.customElements.define(GrEvent.is, GrEvent);
