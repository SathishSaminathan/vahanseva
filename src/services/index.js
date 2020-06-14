import axios from 'axios';
import {API_IP, POST, GET, AppVariables} from '../constants/AppConstants';
import {getData} from '../helpers/utils';

export default class Services {
  async api(type, url, data) {
    let {accessToken} = await getData(AppVariables.USER);
    console.log('getData(AppVariables.USER)..', accessToken);
    let config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    switch (type) {
      case GET:
        console.log('url...', `${API_IP}${url}`);
        return axios.get(`${API_IP}${url}`, config);
      case POST:
        console.log('url...', `${API_IP}${url}`);
        return axios.post(`${API_IP}${url}`, data);
      default:
        break;
    }
  }
}
