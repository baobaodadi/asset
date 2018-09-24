import {spawn} from 'redux-saga/effects';
import asset from './asset';
import mail from './mail';

import back from './back';
import list from './list';
import add from './add';
import edit from './edit';


export default function* () {
  yield [
    spawn(mail),
    spawn(asset),

      spawn(back),
      spawn(list),
      spawn(add),
      spawn(edit),
  ];
}