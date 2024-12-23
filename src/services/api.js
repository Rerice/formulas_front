import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const getFormulas = async () => {
    const response = await axios.get(`${API_URL}/Formula`);
    return response.data;
};

export const addFormula = async (formulaId) => {
    const response = await axios.post(`${API_URL}/Formula`, formulaId);
    return response.data;
};

export const deleteFormula = async (formulaId) => {
    await axios.delete(`${API_URL}/Formula/${formulaId}`);
};

export const getRequestHistory = async (userId) => {
    const response = await axios.get(`${API_URL}/History?userId=${userId}`)
    return response.data
  }

export const login = async (credentials) => {
    const response = await axios.get(`${API_URL}/User`, {
        params: {
            username: credentials.login,
            password: credentials.password
        }
    });

    if (response.data.length !== 0) {
        const userFound = response.data.find((user) => {
          console.log(user, credentials)
          if (
            user.username === credentials.login &&
            user.password === credentials.password
          ) {
            return true
          }
        })
        return userFound
      }
    return null;
};

export const saveRequest = async (
    userId,
    formulaId,
    parametors,
    result = null
  ) => {
    const request = {formula: formulaId, user: userId, parametors, result }
    const response = await axios.post(`${API_URL}/Hystory`, request)
    return response.data
  }
