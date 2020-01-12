import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'easy-peasy';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import 'shards-ui/dist/css/shards.min.css';

import App from './App';
import { store } from './store';

const NewMain = () => {
  return (
    <StoreProvider store={store}>
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
            document.body.style = 'background-color: #282c34;';
            return <App />;
          }}
        </FrameContextConsumer>
      </Frame>
    </StoreProvider>
  );
};

export default NewMain;

// export default class Main extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       nick: undefined,
//       chat: false,
//       messageData: [],
//     };
//   }

//   render() {
//     const element = this.state.chat ? <Chat /> : <Begin />;
//     return (
//       <StoreProvider store={store}>
//         <Context.Provider
//           value={{
//             chat: this.state.chat,
//             setChat: c => this.setState({ chat: c }),
//             messageData: this.state.messageData,
//             setMessageData: c => this.setState({ messageData: c }),
//             socket: this.state.socket,
//             setSocket: c => this.setState({ socket: c }),
//             nick: this.state.nick,
//             setNick: c => this.setState({ nick: c }),
//           }}
//         >
//           <Frame
//             head={[
//               <link
//                 type="text/css"
//                 rel="stylesheet"
//                 key="content-css"
//                 href={chrome.runtime.getURL('/static/css/content.css')}
//               ></link>,
//             ]}
//           >
//             <FrameContextConsumer>
//               {({ document, window }) => {
//                 document.body.style = 'background-color: #282c34;';
//                 return <div>{element}</div>;
//               }}
//             </FrameContextConsumer>
//           </Frame>
//         </Context.Provider>
//       </StoreProvider>
//     );
//   }
// }

const app = document.createElement('div');

app.id = 'my-extension-root';

document.body.appendChild(app);

ReactDOM.render(<NewMain />, app);

app.style.display = 'none';

function toggle() {
  if (app.style.display === 'none') {
    app.style.display = 'block';
  } else {
    app.style.display = 'none';
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  const { message, nickname } = request;
  if (message === 'clicked_browser_action') {
    if (nickname !== undefined) {
      store.dispatch(store.getActions().setNickname(nickname));
    }
    toggle();
  }
});
