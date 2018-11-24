import React from "react";
import ReactDOM from "react-dom";
import { Route, Redirect, BrowserRouter } from "react-router-dom";
import * as pages from "./pages";
import routes from "./routes";

import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <>
        {routes.map((route, index) => {
          const { path, isExact, redirect, component } = route;
          const props = {
            path,
            component: pages[component],
            exact: isExact,
            render: redirect
              ? () => <Redirect to={redirect} />
              : !component
              ? () => <p>Empty page</p>
              : null
          };
          return <Route key={index} {...props} />;
        })}
      </>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
