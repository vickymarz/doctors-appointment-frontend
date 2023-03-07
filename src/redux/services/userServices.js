import jwt_decode from 'jwt-decode';
import fetchApi from './fetchApi';

import {
  BASE_URL,
  SIGNUP_URL,
  LOGIN_URL,
  GET_DOCTORS,
  GET_DOCTOR,
  CREATE_APPOINTMENT,
  GET_APPOINTMENTS,
  GET_APPOINTMENT,
  DELETE_APPOINTMENT,
  LOGOUT,
} from './rootEndpoints';

const register = async (params) => {
  try {
    const result = await fetchApi.post(`${BASE_URL}/${SIGNUP_URL}`, params);
    return result;
  } catch (err) {
    return err;
  }
};

const login = async (params) => {
  try {
    const result = await fetchApi.post(`${BASE_URL}/${LOGIN_URL}`, params);
    if (result.status === 200) {
      localStorage.setItem('jwt-token', result.token);
    }
    return result;
  } catch (err) {
    return err;
  }
};

const getAllDoctors = async () => {
  try {
    const dataObj = await fetchApi.get(`${BASE_URL}/${GET_DOCTORS}`);
    const datas = await dataObj.doctors;
    return datas;
  } catch (err) {
    return err;
  }
};

const getDoctor = async (id) => {
  try {
    const dataObj = await fetchApi.get(`${BASE_URL}/${GET_DOCTOR}/${id}`);
    const datas = await dataObj.doctors;
    return datas;
  } catch (err) {
    return err;
  }
};

const addAppointment = async (params) => {
  try {
    const token = localStorage.getItem('jwt-token');
    const decoded = jwt_decode(token);
    const result = await fetchApi.post(
      `${BASE_URL}/${CREATE_APPOINTMENT}/${decoded.sub}/appointments`,
      params,
    );
    return result;
  } catch (err) {
    return err;
  }
};

const getAllAppointments = async () => {
  try {
    const token = localStorage.getItem('jwt-token');
    const decoded = jwt_decode(token);
    const datas = await fetchApi.get(`${BASE_URL}/${GET_APPOINTMENTS}/${decoded.sub}/appointments`);
    return datas;
  } catch (err) {
    return err;
  }
};

const getAppointment = async (id) => {
  try {
    const token = localStorage.getItem('jwt-token');
    const decoded = jwt_decode(token);
    const dataObj = await fetchApi.get(
      `${BASE_URL}/${GET_APPOINTMENT}/${decoded.sub}/appointments/${id}`,
    );
    const datas = await dataObj.appointments;
    return datas;
  } catch (err) {
    return err;
  }
};

const deleteAppointment = async (id) => {
  try {
    const token = localStorage.getItem('jwt-token');
    const decoded = jwt_decode(token);
    const result = await fetchApi.remove(
      `${BASE_URL}/${DELETE_APPOINTMENT}/${decoded.sub}/appointments/${id}`,
    );
    return result;
  } catch (err) {
    return err;
  }
};

const logout = async () => {
  try {
    const result = await fetchApi.remove(`${BASE_URL}/${LOGOUT}`);
    return result;
  } catch (err) {
    return err;
  }
};

const userServices = {
  register,
  login,
  getAllDoctors,
  getDoctor,
  addAppointment,
  getAllAppointments,
  getAppointment,
  deleteAppointment,
  logout,
};

export default userServices;
