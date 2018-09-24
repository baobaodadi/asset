import {combineReducers} from 'redux';
import asset from './asset';
import mail from './mail';

import globle from './globle';
import back from './back';
import list from './list';
import add from './add';
import edit from './edit';


export default combineReducers({
    asset,
    mail,
    globle,
    back,
    list,
    add,
    edit,
});
