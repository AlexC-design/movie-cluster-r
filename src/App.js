import React from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/configureStore";
import { LastLocationProvider } from "react-router-last-location";

import Logo from "./components/Logo/Logo";
import Navbar from "./components/Navbar/Navbar";
import Routes from "./components/Routes";
import "./css/app.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <HashRouter basename="/">
          <LastLocationProvider>
            <Logo />
            <Navbar />
            <Routes />
          </LastLocationProvider>
        </HashRouter>
      </div>
    </Provider>
  );
}

export default App;
