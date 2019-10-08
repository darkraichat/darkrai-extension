import React, { useContext } from 'react'
import { Container, Form, FormInput, Button } from 'shards-react'
import { Formik } from 'formik'
import axios from 'axios'
import queryString from 'query-string'
import Context from '../context'
import { serverUrl } from '../constants'
import './Begin.css'

const Begin = ({ socket }) => {
  const { setChat, setMessageData } = useContext(Context)

  return (
    <div className="Begin-wrapper">
      <Container>
        <h1 style={{ color: 'white' }}>Hey!</h1>
        <p>Start with what you want to be called</p>
        <Formik
          onSubmit={values => {
            // const url = sessionStorage.getItem('URL')
            const url = window.location.host
            sessionStorage.setItem('NAME', values.name)
            setChat(true)
            socket.emit('add_user', {
              username: values.name,
              website: url,
            })
            axios
              .get(
                `${serverUrl}/logged?` + queryString.stringify({ website: url })
              )
              .then(res => setMessageData(res.data))
          }}
          initialValues={{ name: '' }}
          render={({ handleSubmit, handleChange, values }) => (
            <Form onSubmit={handleSubmit}>
              <FormInput
                name="name"
                type="text"
                value={values.name}
                placeholder="Enter here!"
                onChange={handleChange}
                required
              ></FormInput>
              <br />
              <br />
              <Button theme="light" type="submit">
                Start
              </Button>
            </Form>
          )}
        />
      </Container>
    </div>
  )
}

export default Begin
