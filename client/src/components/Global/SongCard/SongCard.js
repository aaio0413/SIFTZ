import React from "react";
import "../../../css/main.css";

const SongCard = props => (
  <div className="col-3">
    <div className="card card2">
      <img className="card-img-top" src="" alt="song img" />
      {/* src={props.song.img}  */}
      <div className="card-body card-body2">
        <div className="avator">
          <img
            src="https://cdn0.iconfinder.com/data/icons/iconshock_guys/512/andrew.png"
            alt="avator man"
          />
        </div>
        <p className="song-title"> </p>
        {/* {props.song.title} */}
        <div className="star-and-share">
          <i className="far fa-heart" />
          <i className="fas fa-share-square" />
        </div>
      </div>
    </div>
  </div>
);

export default SongCard;
