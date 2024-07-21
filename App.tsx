import * as React from "react";
import Navigation from "./app/src/routes/Navigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import appStore from "./app/redux/appStore";

const App = () => {
  return (
    <Provider store={appStore.appStore}>
      <PersistGate loading={null} persistor={appStore.appPersistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};
export default App;
