import { createRoot } from "react-dom/client";

let container = document.getElementById("root");
if (!container) {
  container = document.createElement("div");
  document.body.appendChild(container);
}

const root = createRoot(container);
root.render(<div>Hello World</div>);
