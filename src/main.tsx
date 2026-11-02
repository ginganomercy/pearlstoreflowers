import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './presentation/App';
import { ErrorBoundary } from './presentation/components/ErrorBoundary';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Fatal: #root element not found in DOM.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary fallbackWhatsAppNumber="6281234567890">
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
