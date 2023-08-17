import axios from 'axios';
import { getUserFromLocalStorage } from './localstorage';
import { clearStore } from '../features/user/userSlice';

const customFetch = axios.create({
  baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
});

customFetch.interceptors.request.use(
  (config) => {
    const user = getUserFromLocalStorage();
    if (user) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
      // in the latest version "common" returns undefined
      // config.headers.common['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const checkForUnauthorizedResponse = (error, thunkApi) => {
  if (error.response.status === 401) {
    thunkApi.dispatch(clearStore());
    return thunkApi.rejectWithValue('unauthorized logging out...');
  }
  return thunkApi.rejectWithValue(error.response.data.msg);
};
export default customFetch;
