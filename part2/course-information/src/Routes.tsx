import * as React from "react";
import { Route } from "react-router-dom";
import Main from "./Layout/Main/Main";

const Routes: React.FC = () => {
  return (
    <>
      <Route path={"/main"} component={Main} />
    </>
  );
};

export default Routes;
