import React, { Fragment } from "react";
import HeaderHome from "../Global/HeaderHome";
import SongCard from "../Global/SongCard";
// import axios from "axios";

class MySiftz extends React.Component {
  state = {
    query: []
  };

  componentDidMount() {
    // fetch("/api/mySiftz/allNightSongs/")
    //   .then(result => {
    //     console.log("this is result", result);
    //     return result.json();
    //   })
    //   .then(data => {
    //     console.log("data", data);
    //     this.setQuery(data);
    //   });

    fetch("http://localhost:3090/api/mySiftz/allNightSongs", {
      headers: { crossDomain: true }
    }).then(res => {
      console.log("this is result", res);
    });

    console.log("well first off, is this working?, ----- YES");

    // fetch("http://localhost:3090/api/mySiftz/allNightSongs/").then(result => {
    //   console.log("this is result", result);
    //   // return result.json();
    //   // this.setQuery(JSON.parse(result.data));
    // });
  }

  setQuery = result => {
    this.setState({ query: result });
  };

  render() {
    return (
      <div className="main-page">
        <HeaderHome />
        <div className="main-picture-for-my-shiftz">
          <h3 className="marketing-blurp-for-myshiftz">SIFTZ</h3>
          {/* #{userName}'s SHIFTZ */}
        </div>
        {/* Photo by Vincent Gerbouin from Pexels  */}
        <div className="body-background1">
          <div className="container main-container">
            <div className="first-text-wrapper2">
              <h2>Songs You Shared Recently</h2>
            </div>
            <div className="row">
              <div className="col-3">
                <SongCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MySiftz;
