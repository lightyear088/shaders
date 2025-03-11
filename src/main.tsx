import { StrictMode } from "react";
import { createRoot } from "react-dom/client";


// import TestBook from "./components/TestBook/testBook";
import App from "./App";
// import Scene from "./components/Scene";


// import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App></App>

  </StrictMode>
);
