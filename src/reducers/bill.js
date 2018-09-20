import {handleActions} from 'redux-actions';
import * as actionTypes from '../config/actionTypes';


const inintialState = {
  isFetching:false,
  data: [],
};

export default handleActions({
  [actionTypes.UPDATE_BILL]: (state, {payload}) => ({
    ...state,
    ...payload
  }),
}, inintialState);
