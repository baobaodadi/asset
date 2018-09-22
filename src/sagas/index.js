import {spawn} from 'redux-saga/effects';
import asset from './asset';
import apps from './apps';
import mail from './mail';


export default function* () {
  yield [
    spawn(apps),
    spawn(mail),
    spawn(asset),
  ];
}