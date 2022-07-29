import userServices from '../services/userServices';

const FETCH_DOCTORS = 'doctors-appointmentment-app-frontend/doctors/FETCH_DOCTORS';

const initialState = [];

export const getDoctors = () => async (dispatch) => {
  const result = await userServices.getAllDoctors();
  return dispatch({
    type: FETCH_DOCTORS,
    payload: result,
  });
};

const doctorsReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case FETCH_DOCTORS:
      return payload;
    default:
      return state;
  }
};

export default doctorsReducer;
