import reducer from './reducer';
import { createStore } from 'redux';

const store = createStore(reducer);

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  return (action) => {
    console.group("DISPATCH");
    console.log('%c state before dispatch', 'color: red', store.getState());
    const returnValue = rawDispatch(action);
    console.log('%c state after dispatch', 'color: blue', store.getState());
    console.groupEnd();
    return returnValue;
  }
}

//overwrite default dispatch to log changes in reducer
store.dispatch = addLoggingToDispatch(store);

export default store;
