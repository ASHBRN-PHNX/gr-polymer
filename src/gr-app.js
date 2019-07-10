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
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';

import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-spinner/paper-spinner.js';

setPassiveTouchGestures(true);
setRootPath(GrAppGlobals.rootPath);

class GrApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          --app-primary-color: #5b83c5;
          --app-toolbar-height: 50px;
        }

        .drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        .header {
          background-color: var(--app-primary-color);
          color: #fff;
          height: var(--app-toolbar-height);
        }

        .header__toolbar {
          @apply --layout-horizontal;
          @apply --layout-justified;
          height: var(--app-toolbar-height);
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
          color: #fff;
          font-size: 12px;
          text-decoration: none;
          text-transform: uppercase;
        }

        .header__title {
          display: inline-block;
          width: auto;
        }

        .menu-button {
          padding: 5px;
        }

        .menu-button[hidden] {
          display: none;
        }

        .menu-button__icon {
          --paper-icon-button-ink-color: #fff;
        }

        .menu-button__item {
          cursor: pointer;
        }

        .menu-button__link {
          color: #000;
          cursor: pointer;
          text-decoration: none;
        }

        .spinner:not([hidden]) {
          @apply --layout-center-center;
          @apply --layout-fit;
          @apply --layout-horizontal;
          background: rgba(255, 255, 255, 0.8);
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

      <app-drawer-layout
        class="drawer-layout"
        force-narrow
        fullbleed
        narrow="{{narrow}}"
      >
        <app-drawer
          class="drawer"
          id="drawer"
          slot="drawer"
          swipe-open="[[narrow]]"
        >
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
          <app-header class="header" slot="header">
            <app-toolbar class="header__toolbar">
              <div class="header__column">
                <a class="header__link" href$="[[rootPath]]chart"
                  ><paper-button hidden$="[[!authenticated]]"
                    >Chart</paper-button
                  ></a
                >
              </div>

              <div class="header__column header__column--center">
                <a class="header__link" href$="[[rootPath]]"
                  ><paper-button>Slayers</paper-button></a
                >
              </div>

              <div class="header__column header__column--right">
                <a
                  class="header__link"
                  hidden$="[[authenticated]]"
                  href$="[[rootPath]]login"
                  ><paper-button>Login</paper-button></a
                >

                <paper-menu-button
                  class="menu-button"
                  hidden$="[[!authenticated]]"
                  horizontal-align="right"
                  no-overlap
                >
                  <paper-icon-button
                    class="menu-button__icon"
                    icon="icons:account-circle"
                    slot="dropdown-trigger"
                  ></paper-icon-button>

                  <paper-listbox slot="dropdown-content">
                    <a class="menu-button__link" href$="[[rootPath]]account">
                      <paper-item>Settings</paper-item>
                    </a>
                    <paper-item class="menu-button__item" on-click="_logout"
                      >Logout</paper-item
                    >
                  </paper-listbox>
                </paper-menu-button>
              </div>
            </app-toolbar>
          </app-header>

          <iron-pages
            attr-for-selected="name"
            on-user-authentication="_onUserAuthentication"
            role="main"
            selected="{{page}}"
          >
            <gr-chart name="chart"></gr-chart>
            <gr-error name="error"></gr-error>
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
        loading="{{loading}}"
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

      <div class="spinner" hidden$="[[!loading]]">
        <paper-spinner
          active="[[loading]]"
          class="spinner__element"
        ></paper-spinner>
      </div>
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
      loading: Boolean,
      page: {
        observer: '_pageChanged',
        type: String,
      },
      routeData: Object,
      subroute: Object,
      user: {
        type: Object,
        value: () => JSON.parse(localStorage.getItem('user')),
      },
      _opened: Boolean,
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
    if (event.detail.response && event.detail.response.authorized) {
      GrAppGlobals.authenticated = true;

      this.authenticated = true;
    }
  }

  /**
   * Logout
   */
  _logout() {
    this.$.logout.generateRequest();

    this.authenticated = false;
    this.user = {};

    GrAppGlobals.authenticated = false;

    localStorage.removeItem('user');

    window.location = '/';
  }

  /**
   * On user authentication
   * @param {object} event
   */
  _onUserAuthentication(event) {
    if (!event.detail.authenticated) {
      this._logout();
    }

    this.user = event.detail.user;

    this.authenticated = event.detail.authenticated;

    GrAppGlobals.authenticated = event.detail.authenticated;

    localStorage.setItem('user', JSON.stringify(this.user));

    window.location = '/';
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
    if (page && (page !== 'home' && page !== 'login') && !this.authorized) {
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
