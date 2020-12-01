import { combineReducers } from 'redux';
import session from './session_api_reducer';
import errors from './errors_reducer';
import entities from './entities_reducer';

export default combineReducers({
    entities,
    session,
    errors
});