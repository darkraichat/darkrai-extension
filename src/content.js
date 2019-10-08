/*global chrome*/
import React from 'react'
import ReactDOM from 'react-dom'
import Frame, { FrameContextConsumer } from 'react-frame-component'
import openSocket from 'socket.io-client'
import Begin from './components/Begin'
import Chat from './components/Chat'
import Context from './context/index'
import { serverUrl } from './constants'
import './content.css'

export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chat: false,
    }
    this.socket = openSocket(serverUrl)
  }

  componentDidMount() {
    this.socket.on('connect', () => {
      console.log('Connected with socket id:', this.socket.id)
    })
  }

  render() {
    const element = this.state.chat ? (
      <Chat socket={this.socket} />
    ) : (
      <Begin socket={this.socket} />
    )
    return (
      <Context.Provider
        value={{
          chat: this.state.chat,
          setChat: c => this.setState({ chat: c }),
          messageData: this.state.messageData,
          setMessageData: c => this.setState({ messageData: c }),
        }}
      >
        <Frame
          head={[
            <link
              type="text/css"
              rel="stylesheet"
              href={chrome.runtime.getURL('/static/css/content.css')}
            ></link>,
          ]}
        >
          <FrameContextConsumer>
            {// Callback is invoked with iframe's window and document instances
            ({ document, window }) => {
              // Render Children
              document.body.style = 'background-color: #282c34;'
              return <div>{element}</div>
            }}
          </FrameContextConsumer>
        </Frame>
      </Context.Provider>
    )
  }
}

const app = document.createElement('div')

app.id = 'my-extension-root'

document.body.appendChild(app)

ReactDOM.render(<Main />, app)

app.style.display = 'none'

function toggle() {
  if (app.style.display === 'none') {
    app.style.display = 'block'
  } else {
    app.style.display = 'none'
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'clicked_browser_action') {
    toggle()
  }
})
