import {combineReducers} from 'redux';
import globle from './globle';
import back from './back';
import list from './list';
import add from './add';
import edit from './edit';


export default combineReducers({
    globle,
    back,
    list,
    add,
    edit,
});
