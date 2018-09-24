/**
 * Created by dady on 2017/12/15.
 */
import {takeLatest, put} from 'redux-saga/effects';
import service from '../utils/service';
import API from '../config/api';
import * as actionTypes from '../config/actionTypes';
import {ENTITY_ADD} from '../config/constants';


function* fetchadd(action) {
  const {payload} = action;
  try {
    console.log(33)
    const data=yield service.get(API[ENTITY_ADD],{...payload});
      console.log(data)
    // yield put({
    //   type: actionTypes.UPDATE_ADD,
    //   payload:  {
    //     data: data,
    //   },
    // });

  }
  catch (e) {
    console.log(e)
  }
}

export default function* () {
  yield [
    takeLatest(actionTypes.FETCH_ADD, fetchadd),
  ];
}
