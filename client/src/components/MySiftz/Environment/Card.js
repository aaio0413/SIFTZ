import React from "react";
import "./Card.scss";

const EnvironmentCard = (props) => (
  <div className="card">
    <img className="card-img-top" src="https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi4qtOW_IDgAhUdHDQIHdS0DZUQjRx6BAgBEAU&url=https%3A%2F%2Fwww.nytimes.com%2F2018%2F09%2F18%2Frealestate%2Flighting-a-room-simplified.html&psig=AOvVaw1XpfMKe6NvdHCOso3Zacpe&ust=1548232095275873" alt="Card image cap"></img>
    <div className="card-body">
      {/* Display list of environment type */}
      <h5 className="card-title">{props.environment} Room</h5>
    </div>
  </div>
)

export default EnvironmentCard;