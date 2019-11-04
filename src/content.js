/*global chrome*/
import React from 'react'
import ReactDOM from 'react-dom'
import Frame, { FrameContextConsumer } from 'react-frame-component'
import Begin from './components/Begin'
import Chat from './components/Chat'
import Context from './context/index'
import 'shards-ui/dist/css/shards.min.css'

export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chat: false,
      messageData: [],
    }
  }

  render() {
    const element = this.state.chat ? <Chat /> : <Begin />
    return (
      <Context.Provider
        value={{
          chat: this.state.chat,
          setChat: c => this.setState({ chat: c }),
          messageData: this.state.messageData,
          setMessageData: c => this.setState({ messageData: c }),
          socket: this.state.socket,
          setSocket: c => this.setState({ socket: c }),
        }}
      >
        <Frame
          head={[
            <link
              type="text/css"
              rel="stylesheet"
              key="content-css"
              href={chrome.runtime.getURL('/static/css/content.css')}
            ></link>,
          ]}
        >
          <FrameContextConsumer>
            {({ document, window }) => {
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
