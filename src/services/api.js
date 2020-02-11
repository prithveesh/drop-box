import * as axios from 'axios';

const BASE_URL = 'http://localhost:8181';

export function upload(formData) {
    const url = `${BASE_URL}/upload`;
    return axios.post(url, formData)
        .then(res => res.data)
}

const options =   {
  headers: {
    'Access-Control-Allow-Origin': true,
  },
  // withCredentials: true,
};

export function getFiles() {
  const url = `${BASE_URL}/files`;
  return axios.get(url, options)
      .then(res => res.data)
}

export function deleteFiles(data) {
  const url = `${BASE_URL}/delete`;
  return axios.post(url, data, options)
      .then(res => res.data);
}
