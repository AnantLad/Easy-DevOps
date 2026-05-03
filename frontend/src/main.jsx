import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import './styles/globals.css';
import App from './App.jsx';

import AuthProvider from "./context/AuthContext.jsx";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <App />
          <Toaster 
            position="top-right"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1e293b',
                color: '#f1f5f9',
                border: '1px solid #334155',
              },
              success: {
                style: {
                  background: '#065f46',
                  borderColor: '#10b981',
                  color: '#d1fae5',
                },
              },
              error: {
                style: {
                  background: '#7f1d1d',
                  borderColor: '#ef4444',
                  color: '#fee2e2',
                },
              },
            }}
          />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
