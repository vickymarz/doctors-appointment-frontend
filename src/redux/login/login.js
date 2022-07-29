import userServices from '../services/userServices';

const LOGIN_API = 'DOCTORS-APPOINTMENT/LOGIN_API';
const LOGOUT_API = 'DOCTORS-APPOINTMENT/LOGOUT_API';

export const IS_LOGIN = 'DOCTORS-APPOINTMENT/IS_LOGIN';

const initialState = {
  isLoggedIn: false,
  user: {},
  status: '',
};

export const loginUser = (user) => async (dispatch) => {
  const data = await userServices.login(user);
  return dispatch({
    type: LOGIN_API,
    payload: data,
  });
};

export const logout = () => async (dispatch) => {
  const data = await userServices.logout();
  return dispatch({
    type: LOGOUT_API,
    payload: data,
  });
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_API:
      return {
        ...state,
        user: action.payload,
        status: action.payload.status,
      };
    case LOGOUT_API:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default loginReducer;
