import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import App from './App';
import './index.css';
import { getMessages } from './languages';

const rootEl = document.getElementById('root');

function renderApp({ messages }) {
  render(
    <IntlProvider messages={messages} defaultLocale="en" locale="en">
      <App />
    </IntlProvider>,
    rootEl
  );
}

async function bootstrapApplication() {
  const [messages] = await Promise.all([getMessages()]);

  renderApp({ messages });
}

bootstrapApplication();
