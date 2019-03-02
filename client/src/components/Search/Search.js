import React, { Component, Fragment } from "react";
import HeaderHome from "../Global/HeaderHome";
import "../../css/main.css";
import "./Search.css";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: [],
      pageNum: 0
    };
  }

  sendInput = e => {
    let paramArray = this.state.userInput.slice();

    console.log(e.target.id);
    const songParam = e.target.id;
    // let currentPage = this.state.pageNum;
    return paramArray.push(songParam);
    // this.setState({ userInput: paramArray, pageNum: currentPage });
    // console.log("this is state", this.state);
  };

  pageNumHundle = e => {
    let currentPageNum = this.state.pageNum;
    currentPageNum++;
    return currentPageNum;
  };

  onClick = e => {
    let a = this.sendInput(e);
    let b = this.pageNumHundle(e);

    this.setState({ userInput: a, pageNum: b });
  };

  render() {
    if (this.state.pageNum === 0) {
      return (
        <Fragment>
          <HeaderHome />
          <div className="whole-seach-component-wrap">
            <h2 className="searchTitile">今ドコにいる？</h2>
            <div className="col-8 search-click-wrapper">
              <div className="search-row">
                <button
                  className="clikable-search"
                  id="inside"
                  onClick={this.onClick}
                >
                  インドア
                </button>
                <button
                  className="clikable-search"
                  id="outside"
                  onClick={this.sendInput}
                >
                  アウトドア
                </button>
              </div>
              <div className="search-row">
                <button
                  className="clikable-search"
                  id="driving"
                  onClick={this.sendInput}
                >
                  ドライブ
                </button>
                <button
                  className="clikable-search"
                  id="search-others"
                  onClick={this.sendInput}
                >
                  おまかせ
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      );
    }
    if (this.state.pageNum === 1) {
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
                  onClick={this.sendInput}
                >
                  ひとりで
                </button>
                <button
                  className="clikable-search"
                  id="withFriends"
                  onClick={this.sendInput}
                >
                  友達と
                </button>
              </div>
              <div className="search-row">
                <button
                  className="clikable-search"
                  id="withSO"
                  onClick={this.sendInput}
                >
                  大切な誰かと
                </button>
                <button
                  className="clikable-search"
                  id="search-others"
                  onClick={this.sendInput}
                >
                  おまかせ
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      );
    }
  }
}

export default Search;
