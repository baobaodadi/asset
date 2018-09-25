/**
 * Created by dady on 2017/12/15.
 */
import {takeLatest, put} from 'redux-saga/effects';
import service from '../utils/service';
import API from '../config/api';
import * as actionTypes from '../config/actionTypes';
import {ENTITY_POSITION} from '../config/constants';

function recursiveTraverse(node) {
  // if (!node || !node.children) { return; }
  // node.title=node.value;
  // node.children.forEach(function(item) {
  //   recursiveTraverse(item);
  // });
}





function* fetchposition(action) {
  const {payload} = action;
  try {

    const data=yield service.get(API[ENTITY_POSITION]);

    data.map((item1,i)=>{
      item1.title=item1.value;
      if(item1.children){
        item1.children.map((item2,i)=>{
          item2.title=item2.value
        })
      }
    });

    yield put({
      type: actionTypes.UPDATE_POSITION,
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
    takeLatest(actionTypes.FETCH_POSITION, fetchposition),
  ];
}
