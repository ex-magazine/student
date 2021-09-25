import { configureStore, ThunkAction, Action, combineReducers} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import createSagaMiddleware  from '@redux-saga/core';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import authReducer from 'features/auth/authSlice';
import { history } from 'utils';
import rootSaga from './rootSaga';
import dashboardReducer from 'features/dashboard/dashboardSlice';
import studentReducer from 'features/student/studentSlice';
import cityReducer from 'features/city/citySlice';



const rootReducer =  combineReducers({
  router: connectRouter(history),  
  counter: counterReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  student: studentReducer,
  city: cityReducer,
});

const sagaMiddleware =  createSagaMiddleware();
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
  // reducer: {
  //   router: rootReducer,
  //   counter: counterReducer,
  // },  
  // middleware: 
  //   getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
    // getDefaultMiddleware({
    //   thunk: true,
    //   serializableCheck: false,
    //   immutableCheck: false,
    // }),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
