import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

import { flattenMessages } from './javascripts/lib/utils';
import messages from './javascripts/lib/intl/messages';

import './stylesheets/main.css';
import App from './javascripts/App';
import registerServiceWorker from './javascripts/registerServiceWorker';
import store from './javascripts/store';

/*
 We are using Redux to manage the multiples states of our app
 React-redux will help us to achieve established patterns of redux. Here we are using Provider

 <Provider store>
 Makes the Redux store available to the connect() calls in the component hierarchy below.
 */

/*
  We are ensuring with react-intl that the we can get the right language of
  the platform or browser
 */

function runApp() {
  addLocaleData([...en, ...es]);

  const locale =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage ||
    'en-US';

  ReactDOM.render(
    <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
      <Provider store={store}>
        <App />
      </Provider>
    </IntlProvider>,
    document.getElementById('root')
  );
  registerServiceWorker();
}

if (!window.Intl) {
  require.ensure(
    ['intl', 'intl/locale-data/jsonp/en.js', 'intl/locale-data/jsonp/es.js'],
    require => {
      require('intl');
      require('intl/locale-data/jsonp/en.js');
      require('intl/locale-data/jsonp/es.js');

      runApp();
    }
  );
} else {
  runApp();
}
