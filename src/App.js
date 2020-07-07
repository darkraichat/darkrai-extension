import React from 'react';
import { useStoreState } from 'easy-peasy';
import 'normalize.css';

import Starter from './components/Starter';
import Chat from './components/Chat';
import './common.scss';

const App = () => {
  const chat = useStoreState((state) => state.chat);
  const element = chat ? <Chat /> : <Starter />;

  return <div>{element}</div>;
};

export default App;
