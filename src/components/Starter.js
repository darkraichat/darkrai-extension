import React, { useEffect, useCallback, useState } from 'react';
import openSocket from 'socket.io-client';
import { Formik, Form, Field } from 'formik';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { auth } from '../utils/auth';

import { serverUrl } from '../constants';
import './Starter.scss';

const Starter = () => {
  const website = window.location.host;
  const [errorMessage, setErrorMessage] = useState('');
  const { setChat, setMessageData, setSocket } = useStoreActions(
    (actions) => actions
  );
  const { username, password } = useStoreState((state) => state);

  const login = useCallback(
    async ({ username, password }) => {
      const { token, error, message, initialMessages } = await auth({
        username,
        password,
        website,
      });

      if (error) {
        setErrorMessage(message);
        return;
      }

      let socket = openSocket(serverUrl, {
        query: { token },
      });

      if (socket) {
        setSocket(socket);
        socket.on('connection');
        socket.emit('add_user', {
          username,
          website,
        });
        setMessageData(initialMessages);
        setChat(true);
      }
    },
    [setChat, setMessageData, setSocket, website]
  );

  useEffect(() => {
    if (username !== undefined) {
      login({ username, password });
    }
  }, [login, username, password, setChat, setMessageData, setSocket, website]);

  return (
    <div className="Starter-wrapper">
      <h1>Hey!</h1>
      <span>Start with what you want to be called</span>
      <br />
      <Formik
        onSubmit={async (values) => {
          login({ username: values.name });
        }}
        initialValues={{ name: '' }}
      >
        {({ handleSubmit, handleChange, values }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              name="name"
              type="text"
              value={values.name}
              placeholder="Enter your name here!"
              onChange={handleChange}
              required
              className="darkrai-input"
            />
            <br />
            <br />
            <button className="darkrai-button" type="submit">
              Start
            </button>
          </Form>
        )}
      </Formik>
      <div className="error-message">{errorMessage}</div>
    </div>
  );
};

export default Starter;
