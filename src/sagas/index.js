import {spawn} from 'redux-saga/effects';
import detail from './detail';
import month from './month';
import apps from './apps';
import merchants from './merchants';
import bill from './bill';
import bank from './bank';
import ddetail from "./ddetail";
import dsettle from "./dsettle";
import serial from "./serial";


export default function* () {
  yield [
    spawn(detail),
    spawn(month),
    spawn(apps),
    spawn(merchants),
    spawn(bill),
    spawn(bank),
    spawn(ddetail),
    spawn(dsettle),
    spawn(serial),
  ];
}