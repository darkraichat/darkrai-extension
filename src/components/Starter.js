import React, { useEffect, useCallback } from 'react';
import { Container, Form, FormInput, Button } from 'shards-react';
import openSocket from 'socket.io-client';
import { Formik } from 'formik';
import axios from 'axios';
import queryString from 'query-string';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { serverUrl } from '../constants';
import './Starter.scss';

const Starter = () => {
  const url = window.location.host;
  const { setChat, setMessageData, setSocket } = useStoreActions(
    actions => actions
  );
  const nickname = useStoreState(state => state.nickname);

  const login = useCallback(username => {
    let socket = openSocket(serverUrl);
    if (socket) {
      setSocket(socket);
      socket.on('connection');
      socket.emit('add_user', {
        username,
        website: url,
      });

      axios
        .get(
          `${serverUrl}/login?` +
            queryString.stringify({ website: window.location.host })
        )
        .then(res => {
          setMessageData(res.data);
          setChat(true);
        })
        .catch(err => console.log('Error:\n', err));
    }
  });

  useEffect(() => {
    if (nickname !== undefined) {
      login(nickname);
    }
  }, [login, nickname, setChat, setMessageData, setSocket, url]);

  return (
    <div className="Starter-wrapper">
      <Container>
        <h1 style={{ color: 'white' }}>Hey!</h1>
        <p>Start with what you want to be called</p>
        <Formik
          onSubmit={async values => {
            chrome.storage.local.set({ nickname: values.name });
            login(values.name);
          }}
          initialValues={{ name: '' }}
        >
          {({ handleSubmit, handleChange, values }) => (
            <Form onSubmit={handleSubmit}>
              <FormInput
                name="name"
                type="text"
                value={values.name}
                placeholder="Enter here!"
                onChange={handleChange}
                required
              />
              <br />
              <br />
              <Button theme="light" type="submit">
                Start
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default Starter;
