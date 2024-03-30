import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import GlobalStyles from './components/GlobalStyles';
import i18n from './utils/i18n';
import { I18nextProvider } from 'react-i18next';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </I18nextProvider>
    </React.StrictMode>,
);
