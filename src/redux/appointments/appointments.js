import userServices from '../services/userServices';

const FETCH_APPOINTMENTS = 'DOCTORS-APPOINTMENT/FETCH_APPOINTMENTS';
const CREATE_APPOINTMENTS = 'DOCTORS-APPOINTMENT/CREATE_APPOINTMENTS';
const DELETE_APPOINTMENTS = 'DOCTORS-APPOINTMENT/DELETE_APPOINTMENTS';

const initialState = { appointments: [] };

export const getAppointments = () => async (dispatch) => {
  const result = await userServices.getAllAppointments();
  return dispatch({
    type: FETCH_APPOINTMENTS,
    payload: result,
  });
};

export const createAppointment = (appointment) => async (dispatch) => {
  const result = await userServices.addAppointment(appointment);
  return dispatch({
    type: CREATE_APPOINTMENTS,
    payload: result,
  });
};

export const deleteAppointment = (id) => async (dispatch) => {
  await userServices.deleteAppointment(id);
  return dispatch({
    type: DELETE_APPOINTMENTS,
    payload: id,
  });
};

const appointmentReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case FETCH_APPOINTMENTS:
      return { ...state, appointments: payload };
    case CREATE_APPOINTMENTS:
      return payload;
    case DELETE_APPOINTMENTS:
      return {
        ...state,
        appointments: [
          ...state.appointments.filter((appointment) => appointment.id !== payload),
        ],
      };
    default:
      return state;
  }
};

export default appointmentReducer;
