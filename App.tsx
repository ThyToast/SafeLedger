import * as React from "react";
import Navigation from "./app/src/routes/Navigation";
import { Provider } from "react-redux";
import appStore from "./app/redux/appStore";

const App = () => {
  return (
    <Provider store={appStore}>
      <Navigation />
    </Provider>
  );
};
export default App;
