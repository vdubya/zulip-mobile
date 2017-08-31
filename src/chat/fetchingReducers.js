/* @flow */
import type { FetchingState, Action } from '../types';
import {
  LOGOUT,
  LOGIN_SUCCESS,
  ACCOUNT_SWITCH,
  SWITCH_NARROW,
  MESSAGE_FETCH_START,
  MESSAGE_FETCH_SUCCESS,
} from '../actionConstants';
import { NULL_FETCHING } from '../nullObjects';

const initialState: FetchingState = {};

export default (state: FetchingState = initialState, action: Action) => {
  switch (action.type) {
    case LOGOUT:
    case LOGIN_SUCCESS:
    case SWITCH_NARROW:
    case ACCOUNT_SWITCH:
      return initialState;

    case MESSAGE_FETCH_START: {
      const key = JSON.stringify(action.narrow);
      const currentValue = state[key] || NULL_FETCHING;

      return {
        ...state,
        [key]: {
          older: action.numBefore > 0 || currentValue.older,
          newer: action.numAfter > 0 || currentValue.newer,
        },
      };
    }

    case MESSAGE_FETCH_SUCCESS: {
      const key = JSON.stringify(action.narrow);
      const currentValue = state[key] || NULL_FETCHING;

      return {
        ...state,
        [key]: {
          older: currentValue.older && action.numBefore === 0,
          newer: currentValue.newer && action.numAfter === 0,
        },
      };
    }

    default:
      return state;
  }
};