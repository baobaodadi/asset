/**
 * Created by dady on 2017/12/15.
 */
import {takeLatest, put} from 'redux-saga/effects';
import service from '../utils/service';
import API from '../config/api';
import * as actionTypes from '../config/actionTypes';
import {ENTITY_MONTH} from '../config/constants';
import moment from 'moment'

function* fetchMonth(action) {
  const {payload} = action;
  try {

    yield put({
      type: actionTypes.UPDATE_MONTH,
      payload:  {
        isFetching: true,
      },
    });

    const data=yield service.get(API[ENTITY_MONTH], {
      merchantNo: payload.merchantNo,
      startDate: payload.startDate.replace(/-/g, ''),
      endDate: payload.endDate.replace(/-/g, ''),
    });

    yield put({
      type: actionTypes.UPDATE_MONTH,
      payload:  {
        data: data,
        isFetching: false,
      },
    });

  }
  catch (e) {
    console.log(e)
  }
}

export default function* () {
  yield [
    takeLatest(actionTypes.FETCH_MONTH, fetchMonth),
  ];
}
