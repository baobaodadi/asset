/**
 * Created by dady on 2017/12/15.
 */
import {takeLatest, put, call} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import service from '../utils/service';
import API from '../config/api';
import * as actionTypes from '../config/actionTypes';
import {ENTITY_DSETTLE} from '../config/constants';


function* LoopDownload(payload) {
  while (true) {
    let data = null;
    try {

      data = yield service.get(API[ENTITY_DSETTLE], {
        merchantNo: payload.merchantNo,
        startDate: payload.startDate.replace(/-/g, ''),
        endDate: payload.endDate.replace(/-/g, ''),
      });

    }
    catch (e) {
      console.log(e)
    }
    yield call(delay, 1000);

    yield put({
      type: actionTypes.UPDATE_DSETTLE,
      payload: {
        data: data,
      },
    });

    if (data.exportStatus === 'NONE' || data.exportStatus === 'DONE') {
      break;
    }
  }
}


function* fetchDsettle({payload}) {
  yield call(LoopDownload, payload);
}


export default function* () {
  yield takeLatest(actionTypes.FETCH_DSETTLE, fetchDsettle);
}