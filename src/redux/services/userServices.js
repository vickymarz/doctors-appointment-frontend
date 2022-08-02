import fetchApi from './fetchApi';
import jwt_decode from 'jwt-decode'

import {
  BASE_URL,
  SIGNUP_URL,
  LOGIN_URL,
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
  try {
		const result = await fetchApi.post(`${BASE_URL}/${SIGNUP_URL}`, params)
		return result
	} catch (err) {
		return err
	} 
};

const login = async (params) => {
  try {
		const result = await fetchApi.post(`${BASE_URL}/${LOGIN_URL}`, params)
		console.log(result);
		if (result.status === 200) {
			localStorage.setItem('jwt-token', result.token)
		}
		return result
	} catch (err) {
		return err
	} 
};

const getAllDoctors = async () => {
  try {
		const dataObj = await fetchApi.get(`${BASE_URL}/${GET_DOCTORS}`)
		console.log(dataObj)
		const datas = await dataObj.doctors
		return datas
	} catch (err) {
		return err
	} 
};

const getDoctor = async (id) => {
  try {
		const dataObj = await fetchApi.get(`${BASE_URL}/${GET_DOCTOR}/${id}`)
		const datas = await dataObj.doctors
		return datas
	} catch (err) {
		return err
	} 
};

const deleteDoctor = async (id) => {
  try {
		await fetchApi.remove(`${BASE_URL}/${DELETE_DOCTOR}/${id}`)
	} catch (err) {
		return err
	} 
};

const addAppointment = async (params) => {
  try {
		const token = localStorage.getItem('jwt-token')
		const decoded = jwt_decode(token)
		await fetchApi.post(`${BASE_URL}/${CREATE_APPOINTMENT}/${decoded.id}/appointments`, params)
	} catch (err) {
		return err
	} 
};

const getAllAppointments = async () => {
  try {
		const token = localStorage.getItem('jwt-token')
		const decoded = jwt_decode(token)
		const dataObj = await fetchApi.get(`${BASE_URL}/${GET_APPOINTMENTS}/${decoded.id}/appointments`)
		const datas = await dataObj.appointments
		return datas
	} catch (err) {
		return err
	} 
};

const getAppointment = async (id) => {
  try {
		const token = localStorage.getItem('jwt-token')
		const decoded = jwt_decode(token)
		const dataObj = await fetchApi.get(
			`${BASE_URL}/${GET_APPOINTMENT}/${decoded.id}/appointments/${id}`,
		)
		const datas = await dataObj.appointments
		return datas
	} catch (err) {
		return err
	} 
};

const deleteAppointment = async (id) => {
  try {
		await fetchApi.remove(`${BASE_URL}/${DELETE_APPOINTMENT}/${decoded.id}/appointments/${id}`)
	} catch (err) {
		return err
	} 
};

const getCurrentUser = async () => {
  try {
		const datas = await fetchApi.get(`${BASE_URL}/${GET_USER}`)
		return datas
	} catch (err) {
		return err
	} 
};

const logout = async () => {
  try {
		await fetchApi.post(`${BASE_URL}/${LOGOUT}`)
	} catch (err) {
		return err
	} 
};

const userServices = {
  register,
  login,
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
