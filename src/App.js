import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";

import SpaceEngine from "./components/SpaceEngine";

import "./css/App.css";
import "./css/Base.css";
import "./css/DialogBox.css";
import "./css/Transitions.css";
import "./css/Plateau.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStar,
  faHourglassStart,
  faTrophy,
  faLevelUpAlt
} from "@fortawesome/free-solid-svg-icons";

library.add(faStar, faHourglassStart, faTrophy, faLevelUpAlt);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App color-pallete1">
          <SpaceEngine />
        </div>
      </Provider>
    );
  }
}

export default App;
