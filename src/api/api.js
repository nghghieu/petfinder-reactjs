import axios from "axios";

const BASE_URL = "https://api.petfinder.com/v2/oauth2/token";
const BASE_URL_ANIMALS = "https://api.petfinder.com/v2/animals";

const api = { BASE_URL, BASE_URL_ANIMALS };
export default api;

export const refreshToken = async () => {
  const apiKey = localStorage.getItem("apiKey");
  const secretKey = localStorage.getItem("secretKey");
  const res = axios({
    method: "post",
    url: `${BASE_URL}`,
    data: {
      grant_type: "client_credentials",
      client_id: apiKey,
      client_secret: secretKey,
    },
  }).then((res) => {
    return res;
  });

  return res;
};

export const getAnimals = async (params, accessToken) => {
  const instance = axios.create({
    baseURL: `${BASE_URL_ANIMALS}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = instance
    .get("", {
      params,
    })
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((err) => {
      return err;
    });

  return data;
};

export const getToken = async (apiKey, secretKey) => {
  const data = axios({
    method: "post",
    url: `${BASE_URL}`,
    data: {
      grant_type: "client_credentials",
      client_id: apiKey,
      client_secret: secretKey,
    },
  })
    .then((res) => {
      const { data } = res;
      localStorage.setItem("apiKey", apiKey);
      localStorage.setItem("secretKey", secretKey);
      return data;
    })
    .catch(() => {
      return { error: true };
    });
  return data;
};
