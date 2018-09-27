/**
 * Created by dady on 2017/12/15.
 */
import {takeLatest, put} from 'redux-saga/effects';
import service from '../utils/service';
import API from '../config/api';
import * as actionTypes from '../config/actionTypes';
import {ENTITY_EDIT} from '../config/constants';


function* fetchedit(action) {
  const {payload} = action;
  try {

    const data=yield service.get(API[ENTITY_EDIT],{
      deviceType:payload.deviceType,
      suiteId:payload.suiteId,
      categoryId:payload.categoryId
    });

    yield put({
      type: actionTypes.UPDATE_EDIT,
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
    takeLatest(actionTypes.FETCH_EDIT, fetchedit),
  ];
}
