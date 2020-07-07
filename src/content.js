import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'easy-peasy';
import Frame, { FrameContextConsumer } from 'react-frame-component';

import App from './App';
import { store } from './store';

const Main = () => {
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
          {({ document }) => {
            document.body.style = 'background-color: #282c34;';
            return <App />;
          }}
        </FrameContextConsumer>
      </Frame>
    </StoreProvider>
  );
};

export default Main;

const app = document.createElement('div');

app.id = 'my-extension-root';

document.body.appendChild(app);

ReactDOM.render(<Main />, app);

app.style.display = 'none';

function toggle() {
  if (app.style.display === 'none') {
    app.style.display = 'block';
  } else {
    app.style.display = 'none';
  }
}

chrome.runtime.onMessage.addListener(function (request) {
  const { message, username, password } = request;
  if (message === 'clicked_browser_action') {
    if (username !== undefined) {
      store.dispatch(store.getActions().setUserDetails({ username, password }));
    }
    toggle();
  }
});
