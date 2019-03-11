import React, { Component, Fragment } from "react";
import HeaderHome from "../Global/HeaderHome";
import SongCard from "../SongCard";
import "../../css/main.css";
import "./Search.css";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: [],
      pageName: "where",
      songData: "nodata"
    };
    this.onClickHome = this.onClickHome.bind(this);
  }

  onClick = e => {
    let paramArray = this.state.userInput.slice();
    let songParam = e.target.id;
    paramArray.push(songParam);

    let pageValue = e.target.value;

    this.setState({ userInput: paramArray, pageName: pageValue }, () => {
      console.log("this is state", this.state);
    });
  };

  onClickHome = e => {
    console.log("home button is clicked", e);
    this.setState(
      { userInput: [], pageName: "where", songDate: "nodata" },
      () => {
        return;
      }
    );
  };

  createSongCard = data => {
    let songCards = [];
    for (let i = 0; i < data.length; i++) {
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
        this.setState({ songData: songData }, () => {
          console.log(
            "lets see what is the state data index 0",
            this.state.songData[0]
          );
        });

        this._fetchSongReqeust = null;
      });
  };

  onClickAndFetch = e => {
    console.log("it's clicked");
    let paramArray = this.state.userInput.slice();
    let songParam = e.target.id;
    paramArray.push(songParam);

    let pageValue = e.target.value;

    this.setState({ userInput: paramArray, pageName: pageValue }, () => {
      console.log("this is state before fetching", this.state);
      this.fetchSongData();
    });
  };

  render() {
    if (this.state.pageName === "where") {
      return (
        <Fragment>
          <HeaderHome value="where" />
          <div className="whole-seach-component-wrap">
            <h2 className="searchTitile">今ドコにいる？</h2>
            <div className="col-8 search-click-wrapper">
              <div className="search-row">
                <button
                  className="clikable-search"
                  id="inside"
                  value="withWho"
                  onClick={this.onClick}
                >
                  インドア
                </button>
                <button
                  className="clikable-search"
                  id="outside"
                  value="withWho"
                  onClick={this.onClick}
                >
                  アウトドア
                </button>
              </div>
              <div className="search-row">
                <button
                  className="clikable-search"
                  id="driving"
                  value="withWho"
                  onClick={this.onClick}
                >
                  ドライブ
                </button>
                <button
                  className="clikable-search"
                  id="outside"
                  value="withWho"
                  onClick={this.onClick}
                >
                  おまかせ
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      );
    }
    if (this.state.pageName === "withWho") {
      return (
        <Fragment>
          <HeaderHome />
          <div className="whole-seach-component-wrap">
            <h2 className="searchTitile">誰と聴く？</h2>
            <div className="col-8 search-click-wrapper">
              <div className="search-row">
                <button
                  className="clikable-search"
                  id="alone"
                  value="activity"
                  onClick={this.onClick}
                >
                  ひとりで
                </button>
                <button
                  className="clikable-search"
                  id="withFriends"
                  value="activity"
                  onClick={this.onClick}
                >
                  友達と
                </button>
              </div>
              <div className="search-row">
                <button
                  className="clikable-search"
                  id="withSO"
                  value="activity"
                  onClick={this.onClick}
                >
                  大切な誰かと
                </button>
                <button
                  className="clikable-search"
                  id="withSO"
                  value="activity"
                  onClick={this.onClick}
                >
                  おまかせ
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      );
    }
    if (this.state.pageName === "activity") {
      return (
        <Fragment>
          <HeaderHome />
          <div className="whole-seach-component-wrap">
            <h2 className="searchTitile">今どんな気分？</h2>
            <div className="col-8 search-click-wrapper">
              <div className="search-row">
                <button
                  className="clikable-search"
                  id="activeFeeling"
                  value="result"
                  onClick={this.onClickAndFetch}
                >
                  アクティブ
                </button>
                <button
                  className="clikable-search"
                  id="chillFeeling"
                  value="result"
                  onClick={this.onClickAndFetch}
                >
                  パッシブ（チル）
                </button>
              </div>
              <div className="search-row">
                {/* <button
                  className="clikable-search"
                  id=""
                  value="result"
                  onClick={this.onClickAndFetch}
                >
                  どちらでもない
                </button> */}
                <button
                  className="clikable-search"
                  id="chillFeeling"
                  value="result"
                  onClick={this.onClickAndFetch}
                >
                  おまかせ
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      );
    }
    if (this.state.pageName === "result") {
      if (this.state.songData === "nodata") {
        return <div />;
      } else {
        return (
          <Fragment>
            <HeaderHome onClick={this.onClickHome} />
            <div className="searchResultHeader" />
            <div className="result-first-message">
              <h2>今のアナタの気分にピッタリの曲。</h2>
            </div>
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
  }
}

export default Search;
