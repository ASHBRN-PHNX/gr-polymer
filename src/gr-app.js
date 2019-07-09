import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import {
  setPassiveTouchGestures,
  setRootPath,
} from '@polymer/polymer/lib/utils/settings.js';

import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';

import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';

import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';

import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

setPassiveTouchGestures(true);
setRootPath(GrAppGlobals.rootPath);

class GrApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          --app-primary-color: #c30000;
        }

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-header {
          color: #fff;
          background-color: #c30000;
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: var(--app-primary-color);
        }

        .header__toolbar {
          @apply --layout-horizontal;
          @apply --layout-justified;
        }

        .header__column {
          @apply --layout-horizontal;
          width: 33%;
        }

        .header__column--center {
          @apply --layout-center-justified;
        }

        .header__column--right {
          @apply --layout-end-justified;
        }

        .header__link {
          text-decoration: none;
          font-size: 12px;
          color: #fff;
          text-transform: uppercase;
        }

        .header__title {
          display: inline-block;
          width: auto;
        }
      </style>

      <app-location
        route="{{route}}"
        url-space-regex="^[[rootPath]]"
      ></app-location>

      <app-route
        route="{{route}}"
        pattern="[[rootPath]]:page"
        data="{{routeData}}"
        tail="{{subroute}}"
      ></app-route>

      <app-drawer-layout force-narrow fullbleed narrow="{{narrow}}">
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
          <app-toolbar class="drawer__toolbar">Menu</app-toolbar>

          <iron-selector
            attr-for-selected="name"
            class="drawer-list"
            role="navigation"
            selected="[[page]]"
          >
          </iron-selector>
        </app-drawer>

        <app-header-layout has-scrolling-region>
          <app-header slot="header">
            <app-toolbar class="header__toolbar">
              <div class="header__column">
                <a class="header__link" href$="[[rootPath]]chart"
                  ><paper-button>Chart</paper-button></a
                >
              </div>

              <div class="header__column header__column--center">
                <a class="header__link" href$="[[rootPath]]"
                  ><paper-button>Slayers</paper-button></a
                >
              </div>

              <div class="header__column header__column--right">
                <a class="header__link" href$="[[rootPath]]login"
                  ><paper-button>Login</paper-button></a
                >
              </div>
            </app-toolbar>
          </app-header>

          <iron-pages attr-for-selected="name" role="main" selected="{{page}}">
            <gr-error name="error"></gr-error>
            <gr-guest name="guest"></gr-guest>
            <gr-home name="home"></gr-home>
            <gr-login name="login"></gr-login>
          </iron-pages>
        </app-header-layout>
      </app-drawer-layout>

      <iron-ajax
        auto
        content-type="application/json"
        id="authorize"
        method="GET"
        on-iron-ajax-response="_checkAuthorization"
        url$="[[config.origin]][[config.api]]authorize"
        with-credentials
      ></iron-ajax>

      <iron-ajax
        content-type="application/json"
        id="logout"
        method="POST"
        url="[[config.origin]][[config.api]]logout"
        with-credentials
      ></iron-ajax>
    `;
  }

  static get is() {
    return 'gr-app';
  }

  static get properties() {
    return {
      authenticated: {
        type: Boolean,
        value: () => GrAppGlobals.authenticated,
      },
      config: {
        type: Object,
        value: () => GrAppGlobals.config,
      },
      page: {
        type: String,
        observer: '_pageChanged',
      },
      routeData: Object,
      subroute: Object,
    };
  }

  static get observers() {
    return ['_routePageChanged(routeData.page)'];
  }

  /**
   * Check authorization
   * @param {Object} event
   */
  _checkAuthorization(event) {
    console.log('TCL: GrApp -> _checkAuthorization -> event', event);
    if (event.detail.response && event.detail.response.authorized) {
      this.authenticated = true;
    }
  }

  /**
   * Page changed
   * @param {String} page
   */
  _pageChanged(page) {
    switch (page) {
      case 'home':
        import('./gr-home.js');
        break;
      case 'login':
        import('./gr-login.js');
        break;
      default:
        import('./gr-error.js');
        break;
    }
  }

  /**
   * Route page changed
   * @param {String} page
   */
  _routePageChanged(page) {
    if (page && (page !== 'home' && page !== 'login') && !this.user) {
      this.page = 'error';
    } else {
      !page ? (this.page = 'home') : (this.page = page);
    }

    this.$.drawer.close();
  }

  /**
   * Show error
   */
  _showError() {
    this.page = 'error';
  }
}

window.customElements.define(GrApp.is, GrApp);
