import axios from 'axios';
import Config from 'react-native-config';

export const getPosts = async (page: any, accessToken: any) => {
  const api = Config.API_URL;
  return axios.get(`${api}posts?page=${page}&pageSize=10`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
