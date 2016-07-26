import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Store from './stores/Store'

const store = new Store()


const rootEl = document.getElementById('root');
ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootEl
);

// if (module.hot) {
//   module.hot.accept('./App', () => {
//     // If you use Webpack 2 in ES modules mode, you can
//     // use <App /> here rather than require() a <NextApp />.
//     const NextApp = require('./App').default;
//     ReactDOM.render(
//       <AppContainer>
//          <NextApp />
//       </AppContainer>,
//       rootEl
//     );
//   });
// }

if (module.hot) {
    module.hot.accept('./components/App.js', () => {
        let AppNext = require('./components/App').default
        render(
                <AppContainer>
                <AppNext store={store} />
                </AppContainer>,
            document.getElementById('root')
        )
    })
}
