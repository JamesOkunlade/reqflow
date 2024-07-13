import React from 'react';
import { createRoot } from "react-dom/client"; 
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './app/store';
import App from './components/App';
import './index.css'

const persistor = persistStore(store);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // Create root

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);