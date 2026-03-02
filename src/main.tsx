// react
import { StrictMode } from "react";

// react-dom
import { createRoot } from "react-dom/client";

// css
import "./index.css";

// app
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
