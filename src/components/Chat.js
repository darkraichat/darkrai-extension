import React, { useState, useContext, useEffect } from 'react'
import { Formik } from 'formik'
import { FormInput, Form, Button } from 'shards-react'
import Bubble from './Bubble'
import Context from '../context'
import './Chat.css'

export default ({ socket }) => {
  const [height, setHeight] = useState(window.innerHeight - 200)
  const { messageData, setMessageData } = useContext(Context)
  const messages = messageData || []

  // Recieve effect
  useEffect(() => {
    socket.on('receive_M', data => {
      setMessageData([...messages, data])
    })
  }, [messageData, messages, setMessageData, socket])

  // Delete effect
  useEffect(() => {
    socket.on('delete_message', data => {
      const temp = messages.filter(item => item.message !== data.message)
      setMessageData(temp)
    })
  }, [messageData, messages, setMessageData, socket])

  // Window listener
  useEffect(() => {
    window.addEventListener('resize', setHeight(window.innerHeight - 200))
    return () =>
      window.removeEventListener('resize', setHeight(window.innerHeight - 200))
  }, [])

  return (
    <div className="Chat-wrapper">
      <div>
        <h1 style={{ color: 'white', margin: 10 }}>Darkrai</h1>
      </div>
      <div
        style={{
          height,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {messages.map(c => {
          const name = sessionStorage.getItem('NAME')
          if (name === c.username)
            return <Bubble by={c.username} content={c.message} user />
          return <Bubble by={c.username} content={c.message} />
        })}
      </div>
      <div style={{ padding: 30 }}>
        <Formik
          initialValues={{
            message: '',
          }}
          onSubmit={(values, actions) => {
            socket.emit('send_M', {
              message: values.message,
            })
            actions.resetForm()
          }}
          render={({ handleChange, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <FormInput
                type="text"
                name="message"
                onChange={handleChange}
                value={values.message}
                style={{ marginRight: 10 }}
              />
              <Button theme="light" type="submit">
                Send
              </Button>
            </Form>
          )}
        />
      </div>
    </div>
  )
}
