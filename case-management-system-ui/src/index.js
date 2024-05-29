import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "rsuite/dist/rsuite.min.css";
import { setupStore } from "./store/index";

const getCmsRender = () => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  const store = setupStore();
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

getCmsRender();
