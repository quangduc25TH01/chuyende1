import axios from 'axios';
import config from '../config';

const baseURL = `${config.apiServerUrl}/api`;

export default axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
