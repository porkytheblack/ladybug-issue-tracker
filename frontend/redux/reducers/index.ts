import { combineReducers } from 'redux';
import { user_reducer } from './user.reducer';

export const rootReducer = combineReducers({
  user: user_reducer
});

export type RootState = ReturnType<typeof rootReducer>;