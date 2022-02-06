import React, { Suspense } from "react";
import ReactDOM from "react-dom";

const App = React.lazy(
  () => import("./frontend/components/main/MessageApp.component")
);

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading Application...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
