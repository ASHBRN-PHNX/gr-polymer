import '@polymer/polymer/polymer-element.js';

const documentContainer = document.createElement('template');

documentContainer.innerHTML = `
  <dom-module id="shared-style">
    <template>
      <style>
        .button {
          display: inline-block;
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

        .button-group__inner {
          display: inline-block;
        }

        .button-group--center {
          @apply --layout-center-justfied;
        }

        .button-group--end {
          @apply --layout-end-justfied;
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

        .page {
          padding: 16px;
        }
      </style>
    </template>
  </dom-module>
`;

document.head.appendChild(documentContainer.content);