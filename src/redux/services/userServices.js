import fetchApi from './fetchApi';
import {
  BASE_URL,
  SIGNUP_URL,
  LOGIN_URL,
  CREATE_DOCTOR,
  GET_DOCTORS,
  GET_DOCTOR,
  DELETE_DOCTOR,
  CREATE_APPOINTMENT,
  GET_APPOINTMENTS,
  GET_APPOINTMENT,
  DELETE_APPOINTMENT,
  GET_USER,
  LOGOUT,
} from './rootEndpoints';

const register = async (params) => {
  const result = await fetchApi.post(`${BASE_URL}/${SIGNUP_URL}`, params);
  return result;
};

const login = async (params) => {
  const result = await fetchApi.post(`${BASE_URL}/${LOGIN_URL}`, params);
  return result;
};

const addDoctor = async (params) => {
  await fetchApi.post(`${BASE_URL}/${CREATE_DOCTOR}`, params);
};

const getAllDoctors = async () => {
  const dataObj = await fetchApi.get(`${BASE_URL}/${GET_DOCTORS}`);
  const datas = await dataObj.doctors;
  return datas;
};

const getDoctor = async (id) => {
  const dataObj = await fetchApi.get(`${BASE_URL}/${GET_DOCTOR}/${id}`);
  const datas = await dataObj.doctors;
  return datas;
};

const deleteDoctor = async (id) => {
  await fetchApi.remove(`${BASE_URL}/${DELETE_DOCTOR}/${id}`);
};

const addAppointment = async (params, user_id) => {
  await fetchApi.post(`${BASE_URL}/${CREATE_APPOINTMENT}/${user_id}/appointments`, params);
};

const getAllAppointments = async (user_id) => {
  const dataObj = await fetchApi.get(
    `${BASE_URL}/${GET_APPOINTMENTS}/${user_id}/appointments`,
  );
  const datas = await dataObj.appointments;
  return datas;
};

const getAppointment = async (user_id, id) => {
  const dataObj = await fetchApi.get(
    `${BASE_URL}/${GET_APPOINTMENT}/${user_id}/appointments/${id}`,
  );
  const datas = await dataObj.appointments;
  return datas;
};

const deleteAppointment = async (user_id, id) => {
  await fetchApi.remove(`${BASE_URL}/${DELETE_APPOINTMENT}/${user_id}/appointments/${id}`);
};

const getCurrentUser = async () => {
  const datas = await fetchApi.get(`${BASE_URL}/${GET_USER}`);
  return datas;
};

const logout = async () => {
  await fetchApi.post(`${BASE_URL}/${LOGOUT}`);
};

const userServices = {
  register,
  login,
  addDoctor,
  getAllDoctors,
  getDoctor,
  deleteDoctor,
  addAppointment,
  getAllAppointments,
  getAppointment,
  deleteAppointment,
  getCurrentUser,
  logout,
};

export default userServices;
