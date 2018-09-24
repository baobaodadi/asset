import {spawn} from 'redux-saga/effects';

import back from './back';
import list from './list';
import add from './add';
import edit from './edit';
import sort from './sort';


export default function* () {
  yield [
      spawn(back),
      spawn(list),
      spawn(add),
      spawn(edit),
      spawn(sort),
  ];
}