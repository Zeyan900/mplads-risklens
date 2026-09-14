import { createRoot } from "react-dom/client";
import { startStudio } from "cssstudio";
import App from "./App";
import "./index.css";

if (import.meta.env.DEV) {
  startStudio();
}

createRoot(document.getElementById("root")!).render(<App />);
