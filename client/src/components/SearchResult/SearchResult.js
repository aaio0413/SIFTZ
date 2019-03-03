import React, { Component, Fragment } from "react";
import HeaderHome from "../Global/HeaderHome";
import SongCard from "../SongCard";
import "../../css/main.css";
// import "./Search.css";

class SearchResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: [],
      pageNum: 0,
      songData: []
    };
  }

  onClick = e => {
    let paramArray = this.state.userInput.slice();
    let songParam = e.target.id;
    // console.log(e.target.id);
    paramArray.push(songParam);

    let currentPageNum = this.state.pageNum;
    currentPageNum++;

    this.setState({ userInput: paramArray, pageNum: currentPageNum }, () => {
      console.log("this is state", this.state);
    });
  };

  createSongCard = data => {
    let songCards = [];
    for (let i = 0; i < 12; i++) {
      songCards.push(<SongCard songInfo={data[i]} key={i} />);
      console.log("this is what you're passing to the component", data[i]);
    }
    return songCards;
  };

  fetchSongData = () => {
    console.log("fetch", this.state.userInput);
    let searchParam = this.state.userInput.join("+");
    console.log(searchParam);

    fetch(`/api/mySiftz/search/songParam/${searchParam}`, {
      headers: { crossDomain: true }
    })
      .then(result => {
        console.log("this is result", result);
        return result.json();
      })
      .then(songData => {
        console.log(songData);
        this.setState({ songData: songData });
        console.log(
          "lets see what is the state data index 0",
          this.state.songData[0]
        );
        this._fetchSongReqeust = null;
      });
  };

  onClickAndFetch = e => {
    console.log("it's clicked");
    let paramArray = this.state.userInput.slice();
    let songParam = e.target.id;
    paramArray.push(songParam);

    let currentPageNum = this.state.pageNum;
    currentPageNum++;

    this.setState({ userInput: paramArray, pageNum: currentPageNum }, () => {
      console.log("this is state before fetching", this.state);
      this.fetchSongData();
    });
  };

  render() {
    return (
      <Fragment>
        <HeaderHome />
        {/* <div className="whole-seach-component-wrap">
            <h2 className="searchTitile">特別なキーワードを付け足す</h2>
            <div className="col-8 search-click-wrapper">
              <div className="search-row">
                <button
                  className="clikable-search"
                  id="alone"
                  onClick={this.onClick}
                >
                  アクティブ
                </button>
                <button
                  className="clikable-search"
                  id="withFriends"
                  onClick={this.onClick}
                >
                  パッシブ（チル）
                </button>
              </div>
            </div>
          </div> */}
        <div className="row">
          {/* <div className="col-3"> */}
          {this.createSongCard(this.state.songData)}
          {}
          {/* <SongCard songInfo={this.state.data} /> */}
          {/* <SongCard songInfo={this.state.data} /> */}
          {/* </div> */}
        </div>
      </Fragment>
    );
  }
}

export default SearchResult;
