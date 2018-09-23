/**
 * Created by dady on 2017/12/15.
 */
import {takeLatest, put} from 'redux-saga/effects';
import service from '../utils/service';
import API from '../config/api';
import * as actionTypes from '../config/actionTypes';
import {ENTITY_LIST} from '../config/constants';


function* fetchlist(action) {
  const {payload} = action;
  try {

    const data=yield service.get(API[ENTITY_LIST],{
      deviceType:payload.deviceType,
      positionId:payload.positionId,
      categoryId:payload.categoryId
    });

    yield put({
      type: actionTypes.UPDATE_LIST,
      payload:  {
        data: data,
      },
    });

  }
  catch (e) {
    console.log(e)
  }
}

export default function* () {
  yield [
    takeLatest(actionTypes.FETCH_LIST, fetchlist),
  ];
}
