import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = React.lazy(() => import('./App'));

ReactDOM.render(
  <React.Suspense fallback={<div>Loading...</div>}>
    <App />
  </React.Suspense>,
  document.getElementById('root')
);