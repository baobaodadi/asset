import {combineReducers} from 'redux';
import asset from './asset';
import apps from './apps';
import globle from './globle';
import mail from './mail';


export default combineReducers({
  asset,
  apps,
  mail,
  globle,
});
