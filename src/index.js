import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './assets/tailwind.output.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamationCircle, faInfoCircle} from '@fortawesome/free-solid-svg-icons'

library.add(faExclamationCircle, faInfoCircle);

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
