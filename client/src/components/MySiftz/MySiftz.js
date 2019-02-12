import React, { Fragment } from "react";
import HeaderHome from "../Global/HeaderHome";
import SongCard from "../Global/SongCard";
// import axios from "axios";

class MySiftz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songData: "this is stuff"
    };
  }

  componentDidMount() {
    this._fetchSongReqeust = fetch("/api/mySiftz/search/night", {
      headers: { crossDomain: true }
    })
      .then(result => {
        console.log("this is result", result);
        return result.json();
      })
      .then(songData => {
        console.log(songData);
        this._fetchSongReqeust = null;
        this.setState({ songData });
      });

    // trimmingUrl(this.songData.url).then(url => {
    //   this.setState({});
    // });
  }

  trimmingUrl(originalUrl) {
    let realUrl = "";
    let index = originalUrl.IndexOf("=");
    if (index > 0) originalUrl = originalUrl.Substring(0, index);
    realUrl = "https://img.youtube.com/vi/" + originalUrl + "/0.jpg";
    return realUrl;
  }

  createSongCard(data) {
    // for(let i=0; i < 13; i++) {
    //   let aSong =[]
    //   for(let j=0; j < i.length; j++) {
    //     aSong.push(j);
    //   }
    //   <SongCard songInfo={aSong}/>
    // }
  }

  // componentWillMount() {
  //   this.fectchSongs();
  //   console.log(this.state.SongData);
  // fetch("http://localhost:3090/api/mySiftz/search/night", {
  //   headers: { crossDomain: true }
  // }).then(res => {
  //   console.log("this is result", res);
  // });
  // fetch("http://localhost:3090/api/mySiftz/allNightSongs/").then(result => {
  //   console.log("this is result", result);
  //   // return result.json();
  //   // this.setQuery(JSON.parse(result.data));
  // });
  // }

  // setQuery = result => {
  //   this.setState({ query: result });
  // };

  // ###############################################MAPPING FUNCTION
  //         var names = ['Jake', 'Jon', 'Thruster'];
  //         var namesList = names.map(function(name){
  //                         return <li>{name}</li>;
  //                       })

  //         return  <ul>{ namesList }</ul>
  //     }

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
                <SongCard songInfo={this.state.songData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MySiftz;
