import {handleActions} from 'redux-actions';
import * as actionTypes from '../config/actionTypes';


const inintialState = {
  data:[],
};

export default handleActions({
  [actionTypes.UPDATE_MERCHANTS]: (state, {payload}) => ({
    ...state,
    ...payload
  }),
}, inintialState);
