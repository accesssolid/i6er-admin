import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider } from 'antd';
import { AntdThemeColors } from './utils/AntdThemeColors';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <ConfigProvider theme={AntdThemeColors}>
      <App />
    </ConfigProvider>
      <ToastContainer closeOnClick={true} autoClose={2000} stacked />
    </PersistGate>
  </Provider>

  // <React.StrictMode>
  // </React.StrictMode>
);

