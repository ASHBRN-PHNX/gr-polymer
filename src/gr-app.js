import { PolymerElement, html } from '@polymer/polymer/polymer-element.js'

import {
  setPassiveTouchGestures,
  setRootPath,
} from '@polymer/polymer/lib/utils/settings.js'

import '@polymer/app-layout/app-drawer/app-drawer.js'
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js'
import '@polymer/app-layout/app-header/app-header.js'
import '@polymer/app-layout/app-header-layout/app-header-layout.js'
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '@polymer/app-layout/app-toolbar/app-toolbar.js'

import '@polymer/app-route/app-location.js'
import '@polymer/app-route/app-route.js'

import '@polymer/iron-pages/iron-pages.js'
import '@polymer/iron-flex-layout/iron-flex-layout.js'
import '@polymer/iron-selector/iron-selector.js'

import '@polymer/paper-button/paper-button.js'
import '@polymer/paper-icon-button/paper-icon-button.js'

setPassiveTouchGestures(true)

setRootPath(GrAppGlobals.rootPath)

class GrApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          --app-primary-color: #22294c;
        }

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-header {
          color: var(--app-primary-color);
          background-color: #fff;
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
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
          color: var(--app-primary-color);
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
            selected="[[page]]"
            attr-for-selected="name"
            class="drawer-list"
            role="navigation"
          >
          </iron-selector>
        </app-drawer>

        <app-header-layout has-scrolling-region>
          <app-header slot="header">
            <app-toolbar class="header__toolbar">
              <div class="header__column">
                <a class="header__link" href="[[rootPath]]event"
                  ><paper-button>event</paper-button></a
                >
                <a class="header__link" href="[[rootPath]]venue"
                  ><paper-button>venue</paper-button></a
                >
                <a class="header__link" href="[[rootPath]]guestbook"
                  ><paper-button>guestbook</paper-button></a
                >
              </div>

              <div class="header__column header__column--center">
                <a class="header__link" href="[[rootPath]]"
                  ><paper-button>Guest Registration</paper-button></a
                >
              </div>

              <div class="header__column header__column--right">
                <a class="header__link" href="[[rootPath]]login"
                  ><paper-button>login</paper-button></a
                >
              </div>
            </app-toolbar>
          </app-header>

          <iron-pages selected="{{page}}" attr-for-selected="name" role="main">
            <gr-error name="error"></gr-error>
            <gr-event name="event"></gr-event>
            <gr-guestbook name="guestbook"></gr-guestbook>
            <gr-home name="home"></gr-home>
            <gr-login name="login"></gr-login>
            <gr-venue name="venue"></gr-venue>
          </iron-pages>
        </app-header-layout>
      </app-drawer-layout>
    `
  }

  static get is() {
    return 'gr-app'
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged',
      },
      routeData: Object,
      subroute: Object,
    }
  }

  static get observers() {
    return ['_routePageChanged(routeData.page)']
  }

  /**
   * @param {String} page
   */
  _routePageChanged(page) {
    if (page && (page !== 'home' && page !== 'login') && !this.user) {
      this.page = 'error'
    } else {
      !page ? (this.page = 'home') : (this.page = page)
    }

    this.$.drawer.close()
  }

  /**
   * @param {String} page
   */
  _pageChanged(page) {
    switch (page) {
      case 'event':
        import('./gr-event.js')
        break
      case 'guestbook':
        import('./gr-guestbook.js')
        break
      case 'home':
        import('./gr-home.js')
        break
      case 'login':
        import('./gr-login.js')
        break
      case 'venue':
        import('./gr-venue.js')
        break
      default:
        import('./gr-error.js')
        break
    }
  }

  /**
   *
   */
  _showError() {
    this.page = 'error'
  }
}

window.customElements.define(GrApp.is, GrApp)
