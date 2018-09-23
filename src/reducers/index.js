import {combineReducers} from 'redux';
import asset from './asset';
import back from './back';
import globle from './globle';
import mail from './mail';

export default combineReducers({
  asset,
  back,
  mail,
  globle,
});
