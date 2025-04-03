import React from 'react';
import hmr from 'webpack-hot-middleware/client';
import type { ClientOptions } from 'webpack-hot-middleware/client';
import { __DEVELOPMENT__ } from '@generated';

import { createRoot } from 'react-dom/client';

export default function renderer(rootName : string, App: React.FC) {

  document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById(rootName);

    if (!container) {
      console.error(`Cannot find root element ${rootName}`);
      return;
    }


    if (__DEVELOPMENT__) {
      // The following options allow you to reload the entire page when changes are made. 
      // HMR allows you to reload only the necessary components but this does not work correctly for css/sass/scss which are built together with Pug.
      const options : ClientOptions  = {
        reload: true
      };
      hmr.setOptionsAndConnect(options);

      hmr.subscribeAll((obj) => {
        if (obj.action === 'built')
          location.reload();
      });

      if (import.meta.webpackHot) {
        console.log('Accepting hot middleware');
        const webpackHot = import.meta.webpackHot;
        webpackHot.accept();
      }
      const root = createRoot(container);
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>);
    } else {
      const root = createRoot(container);
      root.render(<App />);
    }
  });
};
