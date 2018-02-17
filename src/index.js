import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import basa from './api/basa';

// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App basa={basa} />, document.getElementById('root'));
// registerServiceWorker();
