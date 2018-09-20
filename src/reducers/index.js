import {combineReducers} from 'redux';
import globle from './globle';
import detail from './detail';
import month from './month';
import apps from './apps';
import merchants from './merchants';
import bill from './bill';
import bank from './bank';
import ddetail from './ddetail';
import dsettle from './dsettle';
import serial from './serial';

export default combineReducers({
  globle,
  detail,
  month,
  apps,
  merchants,
  bill,
  bank,
  ddetail,
  dsettle,
  serial,
});
