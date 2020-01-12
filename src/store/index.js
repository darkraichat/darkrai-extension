import { createStore, action } from 'easy-peasy';

export const model = {
  nickname: undefined,
  setNickname: action((state, payload) => {
    state.nickname = payload;
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
