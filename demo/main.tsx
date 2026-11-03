import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/nunito/900.css";
import "@fontsource/noto-sans-sc/900.css";
import "../src/fonts.css";
// Explicit imports preserve component styles when the source barrel is tree-shaken.
import "../src/style.css";
import "../src/typography.css";
import "../src/legibility.css";
import "../src/motion.css";
import { ToastProvider } from "../src";
import { App } from "./App";
import "./docs.css";
import "./screens/screens.css";
import "./typography.css";
import "./legibility.css";
import "./illustrations.css";
import "./motion.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>,
);
