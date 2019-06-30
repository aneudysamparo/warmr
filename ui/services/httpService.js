import axios from 'axios';

const HttpService = (options) => {
  const defaultOptions = options || {
    baseURL: 'http://10.0.0.153:3000',
    method: 'get',
    headers: {
      common: {
        'Content-Type': 'application/json',
      },
    },
  };
  /* Create custom instance */
  return axios.create(defaultOptions);
};

export default HttpService;
