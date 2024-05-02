import axios from 'axios';

export const getPosts = async (page: any, accessToken: any) => {
  return axios.get(
    `https://backend-practice.euriskomobility.me/posts?page=${page}&pageSize=10`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
};
