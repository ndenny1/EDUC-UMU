import axios from 'axios';
import AuthService from '@/common/authService';
import { ApiRoutes } from '@/utils/constants';

// Buffer concurrent requests while refresh token is being acquired
let isRefreshing = false;
let failedQueue = [];

function processQueue(error, token = null) {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
}

// Create new non-global axios instance and intercept strategy
const apiAxios = axios.create();
const intercept = apiAxios.interceptors.response.use(config => config, error => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        try {
          const token = failedQueue.push({ resolve, reject });
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return axios(originalRequest);
        } catch (e) {
          return e;
        }
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    return new Promise((resolve, reject) => {
      AuthService.refreshAuthToken(localStorage.getItem('refreshToken'))
        .then(response => {
          if (response.jwt) {
            localStorage.setItem('jwtToken', response.jwt);
            apiAxios.defaults.headers.common['Authorization'] = `Bearer ${response.jwt}`;
            originalRequest.headers['Authorization'] = `Bearer ${response.jwt}`;
          }
          if (response.refreshToken) {
            localStorage.setItem('refreshToken', response.refreshToken);
          }

          processQueue(null, response.jwt);
          resolve(axios(originalRequest));
        })
        .catch(e => {
          processQueue(e, null);
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('refreshToken');
          reject(e);
        })
        .finally(() => isRefreshing = false);
    });
  }

  return Promise.reject(error);
});

export default {
  apiAxios: apiAxios,
  intercept: intercept,

  //Adds required headers to the Auth request
  setAuthHeader(token) {
    if (token) {
      apiAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete apiAxios.defaults.headers.common['Authorization'];
    }
  },
  async getUsers() {
    try{
      const response = await apiAxios.get(ApiRoutes.USERS);
      if(response.status == 500){
        return response.status;
      }
      console.log(response.data);
      const rows = response.data.rows;
      var returnJson;
      rows.forEach(function(element, index){
        returnJson[index].system =  element[0],
        returnJson[index].username = element[1],
        returnJson[index].name = element[2],
        returnJson[index].value = element[3],
        returnJson[index].authSource = element[4],
        returnJson[index].guid = element[5],
        returnJson[index].create = element[6];
        returnJson[index].createDate = element[7],
        returnJson[index].update = element[8],
        returnJson[index].updateDate = element[9]
      });
      return returnJson;
    } catch(e) {
      console.log(`Failed to fetch from API - ${e}`);
      throw e;
    }
  },

  async addUser(userInfo){
    try{
      const response = await apiAxios.post(ApiRoutes.USERS, userInfo);
      if(response.status == 500){
        return true;
      }
      return response.data.error;
    } catch(e) {
      console.log(`Failed to post to API - ${e}`);
      throw e;
    }
  },
  async updateUser(updateInfo){
    try{
      const response = await apiAxios.put(ApiRoutes.USERS, updateInfo);
      if(response.status == 500){
        return true;
      }
      return response.data.error;
    } catch(e) {
      console.log(`Failed to post to API - ${e}`);
      throw e;
    }
  },
  async deleteUser(userInfo){
    try{
      const response = await apiAxios.delete(ApiRoutes.USERS, userInfo);
      if(response.status == 500){
        return true;
      }
      return response.data.error;
    } catch(e) {
      console.log(`Failed to delete from API - ${e}`);
      throw e;
    }
  },
  async getRoles(){
    try{
      const response = await apiAxios.get(ApiRoutes.ROLES);
      if(response.status == 500){
        return response.status;
      }
      return response.data;
    } catch(e) {
      console.log(`Failed to fetch from API - ${e}`);
      throw e;
    }
  },
  async addRole(roleInfo){
    try{
      const response = await apiAxios.post(ApiRoutes.ROLES, roleInfo);
      if(response.status == 500){
        return true;
      }
      return response.data.error;
    } catch(e) {
      console.log(`Failed to post to API - ${e}`);
      throw e;
    }
  },
  async updateRole(roleInfo){
    try{
      const response = await apiAxios.put(ApiRoutes.ROLES, roleInfo);
      if(response.status == 500){
        return true;
      }
      return response.data.error;
    } catch(e) {
      console.log(`Failed to post to API - ${e}`);
      throw e;
    }
  },
  async deleteRole(roleInfo){
    try{
      const response = await apiAxios.delete(ApiRoutes.ROLES, roleInfo);
      if(response.status == 500){
        return true;
      }
      return response.data.error;
    } catch(e) {
      console.log(`Failed to delete from API - ${e}`);
      throw e;
    }
  },
  async getProxy(){
    try{
      const response = await apiAxios.get(ApiRoutes.PROXY);
      if(response.status == 500){
        return response.status;
      }
      return response.data;
    } catch(e) {
      console.log(`Failed to fetch from API - ${e}`);
      throw e;
    }
  },
  async addProxy(proxyInfo){
    try{
      const response = await apiAxios.post(ApiRoutes.PROXY, proxyInfo);
      if(response.status == 500){
        return true;
      }
      return response.data.error;
    } catch(e) {
      console.log(`Failed to post to API - ${e}`);
      throw e;
    }
  },
  async updateProxy(proxyInfo){
    try{
      const response = await apiAxios.put(ApiRoutes.PROXY, proxyInfo);
      if(response.status == 500){
        return true;
      }
      return response.data.error;
    } catch(e) {
      console.log(`Failed to post to API - ${e}`);
      throw e;
    }
  },
  async deleteProxy(proxyInfo){
    try{
      const response = await apiAxios.delete(ApiRoutes.PROXY, proxyInfo);
      if(response.status == 500){
        return true;
      }
      return response.data.error;
    } catch(e) {
      console.log(`Failed to delete from API - ${e}`);
      throw e;
    }
  },
};
