import React, { useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { useStoreState, useStoreActions } from 'easy-peasy';

import './Chat.scss';

// eslint-disable-next-line react/display-name
const Message = React.forwardRef(({ by, content, user }, ref) => (
  <span
    ref={ref}
    style={{
      padding: 4,
      color: user ? 'cyan' : 'white',
    }}
  >
    <b>{by}:</b> {content}
  </span>
));

Message.propTypes = {
  by: PropTypes.string,
  content: PropTypes.string,
  user: PropTypes.bool,
};

const Chat = () => {
  const lastMessageRef = useRef(null);
  const { messageData, socket, username } = useStoreState((state) => state);
  const setMessageData = useStoreActions((actions) => actions.setMessageData);
  const messages = useMemo(() => messageData || [], [messageData]);

  const chatScroll = () =>
    lastMessageRef?.current?.scrollIntoView({ behavior: 'smooth' });

  // Recieve effect
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageData([...messages, data]);
      chatScroll();
    });
  }, [messageData, messages, setMessageData, socket]);

  // Delete effect
  useEffect(() => {
    socket.on('delete_message', (data) => {
      const temp = messages.filter((item) => item.message !== data.message);
      setMessageData(temp);
    });
  }, [messageData, messages, setMessageData, socket]);

  // Scroll to last message on mount
  useEffect(() => {
    chatScroll();
  }, []);

  return (
    <div className="Chat-wrapper">
      <div>
        <span className="title">Darkrai</span>
        <br />
        <span>
          To Chat with ChatBot type <b>Cb-your query</b>
        </span>
        <br />
        <br />
        <span>
          chatting as <b>{username}</b>
        </span>
      </div>
      <br />
      <div className="message-list">
        {messages.map((c, i) => {
          return (
            <Message
              key={i}
              by={c.username}
              content={c.message}
              {...(username === c.username && { user: true })}
              {...(i === messages.length - 1 && { ref: lastMessageRef })}
            />
          );
        })}
      </div>
      <div className="send-form">
        <Formik
          initialValues={{
            message: '',
          }}
          onSubmit={(values, actions) => {
            socket.emit('send_message', {
              message: values.message,
            });
            actions.resetForm();
          }}
        >
          {({ handleChange, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                type="text"
                name="message"
                onChange={handleChange}
                value={values.message}
                style={{ marginRight: 10 }}
                placeholder="Type here"
                required
                className="darkrai-input"
              />
              <button className="darkrai-button" type="submit">
                Send
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Chat;
