import userServices from '../services/userServices';

const REGISTER_API = 'DOCTORS-APPOINTMENT/REGISTER_API';

const initialState = {
  isLoggedIn: false,
  user: {},
  status: '',
};

export const signupUser = (user) => async (dispatch) => {
  const data = await userServices.register(user);
  return dispatch({
    type: REGISTER_API,
    payload: data,
  });
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_API:
      return {
        ...state,
        user: action.payload,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export default registerReducer;
