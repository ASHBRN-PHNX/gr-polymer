import '@polymer/polymer/polymer-element.js';

const documentContainer = document.createElement('template');

documentContainer.innerHTML = `
  <dom-module id="shared-style">
    <template>
      <style>
        :host {
          --iron-image-placeholder: {
            filter: blur(10px);
            overflow: hidden;
            transform: scale(1.1);
            width: 110%;
          }
        }

        .button {
          display: inline-block;
          text-align: center;
        }

        .button--facebook {
          background: var(--paper-indigo-700);
          color: #fff;
        }

        .button--google {
          color: var(--paper-red-700);
        }

        .button-group {
          @apply --layout-horizontal;
        }

        .button-group--center {
          @apply --layout-center-justified;
          margin: auto;
        }

        .button-group__inner {
          display: inline-block;
        }

        .hero {
          height: 75vh;
          position: relative;
          width: 100%;
        }

        .hero__image {
          height: 100%;
          width: 100%;
        }

        .hero__content {
          @apply --layout-center-center;
          @apply --layout-fit;
          @apply --layout-horizontal;
        }

        .hero__text {
          color: var(--app-primary-color);
        }

        .page {
          margin: 0 auto;
          max-width: 1200px;
          padding: 16px;
          width: 100%;
        }
      </style>
    </template>
  </dom-module>
`;

document.head.appendChild(documentContainer.content);
