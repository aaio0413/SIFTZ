import React, { Component, Fragment } from "react";
import HeaderHome from "../Global/HeaderHome";
import "../../css/main.css";
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <HeaderHome />
        <div className="main-picture">
          <h3 className="marketing-blurp">
            プレミアム SHIFTZ で人生をもっと快適に過ごそう。
          </h3>
        </div>
      </Fragment>
    );
  }
}

export default Home;
