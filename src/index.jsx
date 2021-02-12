import '@/sass/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from '@/components/App/App';

import reducer from '@/reducer/reducer';
import { Operation } from '@/reducer/application/application';

const json = require('@/flights.json');

const data = JSON.parse(JSON.stringify(json));

const root = document.querySelector('.app');

const store = createStore(reducer, applyMiddleware(thunk));

store.dispatch(Operation.fillStore(data.result.flights));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root,
);
