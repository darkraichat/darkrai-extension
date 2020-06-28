import axios from 'axios';
import { serverUrl } from '../constants';

export const auth = async ({ username, password, website }) => {
  try {
    if (!password) {
      return await register({ username, website });
    }
    const {
      data: { initialMessages, token },
    } = await axios.post(`${serverUrl}/login`, {
      username,
      password,
      website,
    });
    return { initialMessages, token };
  } catch (err) {
    if (err.response.status === 400) {
      register({ username, website });
    }
  }
};

const register = async ({ username, website }) => {
  try {
    const {
      data: { initialMessages, token, password },
    } = await axios.post(`${serverUrl}/register`, { username, website });
    chrome.storage.local.set({ username });
    chrome.storage.local.set({ password });
    return { initialMessages, token };
  } catch (err) {
    if (err.response.status === 400) {
      return { message: err.response.data.message, error: true };
    }
    return { message: 'Something went wrong. Please try again.', error: true };
  }
};
