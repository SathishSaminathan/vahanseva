import axios from 'axios';
import {API_IP, POST, GET, AppVariables} from '../constants/AppConstants';
import {getData} from '../helpers/utils';

export default class Services {
  async api(type, url, data) {
    let config = null;
    let user = await getData(AppVariables.USER);
    if (user && user.accessToken) {
      console.log('getData(AppVariables.USER)..', user.accessToken);
      config = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      };
    }
    switch (type) {
      case GET:
        console.log('url...', `${API_IP}${url}`);
        return axios.get(`${API_IP}${url}`, config);
      case POST:
        console.log('url...', `${JSON.stringify(data)} ${API_IP}${url}`);
        return axios.post(`${API_IP}${url}`, data, config);
      default:
        break;
    }
  }
}
