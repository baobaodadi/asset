import {spawn} from 'redux-saga/effects';
import asset from './asset';
import back from './back';
import mail from './mail';


export default function* () {
  yield [
    spawn(back),
    spawn(mail),
    spawn(asset),
  ];
}