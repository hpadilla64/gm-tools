import 'antd/dist/reset.css';
import '../styles/index.less';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { App } from '../components/App';
import { PRIMARY_COLOR } from '../tools/theme';

createRoot(document.getElementById('main')!).render(
  <StrictMode>
    <ConfigProvider theme={{ token: { colorPrimary: PRIMARY_COLOR } }}>
      <App />
    </ConfigProvider>
  </StrictMode>
);
