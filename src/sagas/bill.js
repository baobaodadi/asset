/**
 * Created by dady on 2017/12/15.
 */
import {takeLatest, put} from 'redux-saga/effects';
import service from '../utils/service';
import API from '../config/api';
import * as actionTypes from '../config/actionTypes';
import {ENTITY_BILL} from '../config/constants';


function* fetchBill(action) {
  const {payload} = action;
  try {

    yield put({
      type: actionTypes.UPDATE_BILL,
      payload:  {
        isFetching: true,
      },
    });

    const data=yield service.get(API[ENTITY_BILL](payload.accountId), {
      account: payload.accountId,
      begin:payload.startDate+' '+'00:00:00' ,
      end:payload.endDate+' '+'23:59:59',
    });

    yield put({
      type: actionTypes.UPDATE_BILL,
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
    takeLatest(actionTypes.FETCH_BILL, fetchBill),
  ];
}
