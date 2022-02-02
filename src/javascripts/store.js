import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import appReducer from './reducers/app';
import loginReducer from './reducers/login';
import lockersReducer from './reducers/lockers';
import alertReducer from './reducers/alert';
import usersReducer from './reducers/users';
import masterkeysReducer from './reducers/masterkeys';

/*
 this help us to combine different states needed in our app
 In case you need more Reducers, feel free to add.
 */

const reducer = combineReducers({
  app: appReducer,
  login: loginReducer,
  lockers: lockersReducer,
  alert: alertReducer,
  users: usersReducer,
  masterkeys: masterkeysReducer
});

/*
  Here we create our store together with the reducer and a middleware provided by
  React thunk to help us to manage the store in a async way (useful for future API calls)
  As well we add helpers for developers to see how redux is interacting with the state in the browser
 */

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
