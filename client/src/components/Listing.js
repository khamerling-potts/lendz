import { useState } from "react";

function Listing({ listing }) {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <div className="card h-100">
        <div className="card-body">
          <small>{listing.user.username}</small>
          <h5 className="card-title">{listing.title}</h5>
          <img src={listing.img_url} className="mx-auto img-fluid" />
          <p className="card-text">{listing.description}</p>
          <div className="d-flex justify-content-between">
            <span className="card-subtitle">{listing.zip}</span>
            <span className="card-subtitle">{listing.meeting_place}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listing;
