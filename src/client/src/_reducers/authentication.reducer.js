import { playerConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case playerConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case playerConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case playerConstants.LOGIN_FAILURE:
      return {};
    case playerConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
