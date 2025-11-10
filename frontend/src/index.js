import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

/**
 * Silence harmless autoplay interruption errors from embedded players.
 * Browsers may reject a play() promise when an iframe is removed while the
 * promise is resolving. This prevents the dev overlay from treating that as fatal.
 */
window.addEventListener('unhandledrejection', (event) => {
  try {
    const msg = (event && event.reason && (event.reason.message || '')).toString();
    if (!msg) return;
    // match common variants of the autoplay interruption message
    if (
      msg.includes('play() request was interrupted') ||
      msg.includes('The play() request was interrupted') ||
      msg.includes('The play() request was interrupted because the media was removed from the document') ||
      msg.includes('play() failed because the user didn\'t interact')
    ) {
      event.preventDefault();
    }
  } catch (err) {
    // ignore any errors in this handler
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
