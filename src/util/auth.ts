
import axios, { AxiosError } from 'axios';

const BASE_URL = process.env.NODE_ENV === "development" ? 'http://localhost:8000' : 'http://localhost:8000'
const ACCESS_TOKEN = '<this will change>'
const REFRESH_TOKEN = '<this will change>'

let tokenRequest = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json'
  }
})

const loginUser = async (username: string, email: string, password: string) => {
  const loginBody = { username: username, email: email, password: password }
  try {
    const response = await tokenRequest.post(`/auth/login/`, loginBody);
    console.log(response.data.key)
    window.localStorage.setItem(ACCESS_TOKEN, response.data.key);
    return await Promise.resolve(response.data);
  } catch (error) {
    return await Promise.reject(error);
  }
}

const refreshToken = async () => {
  const refreshBody = { "refresh": window.localStorage.getItem(REFRESH_TOKEN) }
  try {
    const response = await tokenRequest.post(`/api/token/access/`, refreshBody);
    window.localStorage.setItem(ACCESS_TOKEN, response.data.access);
    return await Promise.resolve(response.data);
  } catch (error) {
    return await Promise.reject(error);
  }
}

const isCorrectRefreshError = (status: number | undefined) => {
  return status === 401;
}

/*
 * authRequest
 *
 * This refreshes the request and retries the token if it is invalid.
 * This is what you use to create any requests that need the Tokens.
 * Reference: https://hackernoon.com/110percent-complete-jwt-authentication-with-django-and-react-2020-iejq34ta
 *
 * Example:
 *     authRequest.get('/path/to/endpoint/',extraParameters)
 *        .then(response=>{
 *          // do something with successful request
 *        }).catch((error)=> {
 *          // handle any errors.
 *        });
*/
const authRequest = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Authorization': `Token ${window.localStorage.getItem(ACCESS_TOKEN)}`,
    'Content-Type': 'application/json',
  }
});
authRequest.interceptors.response.use(
  (response) => response, // this is for all successful requests.
  (error) => { //handle the request
    return errorInterceptor(error)
  }
);

const errorInterceptor = async (error: AxiosError) => {
  if (error) {
    if (error.response) {
      const originalRequest = error.config;
      const status = error.response.status;
      if (isCorrectRefreshError(status)) {
        try {
          await loginUser("Test", "test@test.com", "Password123!");
          const headerAuthorization = `Token ${window.localStorage.getItem(ACCESS_TOKEN)}`;
          authRequest.defaults.headers['Authorization'] = headerAuthorization;
          originalRequest.headers['Authorization'] = headerAuthorization;
          return await authRequest(originalRequest);
        } catch (error_1) {
          // if token refresh fails, logout the user to avoid potential security risks.
          logoutUser();
          return await Promise.reject(error_1);
        }
      }
      return Promise.reject(error);
    } else {
      return Promise.reject("Error did not provide a code");
    }
  } else {
    return Promise.reject("Error was undefiened");
  }
}

const logoutUser = () => {
  window.localStorage.removeItem(ACCESS_TOKEN);
  window.localStorage.removeItem(REFRESH_TOKEN);
  authRequest.defaults.headers['Authorization'] = "";
}

export {
  tokenRequest, loginUser, logoutUser, refreshToken, authRequest,
  errorInterceptor, BASE_URL, ACCESS_TOKEN, REFRESH_TOKEN
}
