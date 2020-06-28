import { createStore, action } from 'easy-peasy';

export const model = {
  username: undefined,
  password: undefined,
  setUserDetails: action((state, payload) => {
    state.username = payload.username;
    state.password = payload.password;
  }),
  chat: false,
  setChat: action((state, payload) => {
    state.chat = payload;
  }),
  messageData: [],
  setMessageData: action((state, payload) => {
    state.messageData = payload;
  }),
  socket: undefined,
  setSocket: action((state, payload) => {
    state.socket = payload;
  }),
};

export const store = createStore(model);
