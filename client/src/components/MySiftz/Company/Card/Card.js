import React from "react";
import "./Card.scss";

const CompanyCard = (props) => (
  <div className="card">
    <img className="card-img-top" src="https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjS7v-D-4DgAhV-ITQIHRTnCyAQjRx6BAgBEAU&url=https%3A%2F%2Fwww.express.co.uk%2Flife-style%2Flife%2F836647%2FBest-friends-mates-when-age-primary-school&psig=AOvVaw1YBUlbDpCWMCcLFpS5Q0tc&ust=1548231775123195" alt="Card image cap"></img>
    <div className="card-body">
      {/* Display list of company type */}
      <h5 className="card-title">{props.company} Company Type</h5>
    </div>
  </div>
)

export default CompanyCard;