import {handleActions} from 'redux-actions';
import * as actionTypes from '../config/actionTypes';

const inintialState = {
  data: null,
};

export default handleActions({
  [actionTypes.UPDATE_DSETTLE]: (state, {payload}) => ({
    ...state,
    ...payload
  }),
}, inintialState);
