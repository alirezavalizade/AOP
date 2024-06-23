import React from "react";
import ReactDOM from "react-dom/client";
import AppProviders from "./contexts/AppProviders.tsx";
import App from "./App.tsx";
import "./index.css";
import { worker } from "./mocks/browser.ts";

async function main() {
  // Start the mocking server when the app is started
  await worker.start({
    onUnhandledRequest: "bypass",
  });

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>,
  );
}

main();
